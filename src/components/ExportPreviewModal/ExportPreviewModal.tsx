import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { Registration } from 'destroyable';
import { useEffect, useMemo, useState } from 'react';
import spaceTrim from 'spacetrim';
import { exportAsHtml } from '../../export/exportAsHtml';
import { HtmlExportFile } from '../../export/HtmlExportFile';
import { usePromise } from '../../utils/hooks/usePromise';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { string_javascript, string_uri } from '../../utils/typeAliases';
import { ObjectUrl } from './utils/ObjectUrl';

interface ExportPreviewModalProps {}

/**
 * @@
 */
export function ExportPreviewModal(props: ExportPreviewModalProps) {
    const [wallpaper] = useWallpaper();
    const exportedPromise = useMemo(
        () =>
            /* not await */ exportAsHtml(wallpaper, {
                stylesPlace: 'EXTERNAL',
                publicUrl: new URL('https://example.com/'),
            }),
        [wallpaper],
    );
    const { value: exported } = usePromise(exportedPromise);

    // --------------
    // TODO: Maybe make some hook for this
    const [indexUrl, setIndexUrl] = useState<null | URL>(null);
    const [urlMap, setUrlMap] = useState<null | Map<string_uri, string_uri>>(null);
    useEffect(() => {
        if (!exported) {
            return;
        }

        let pageFiles: Array<HtmlExportFile> = [];
        let codeFiles: Array<HtmlExportFile> = [];
        let assetFiles: Array<HtmlExportFile> = [];

        for (const file of exported.files) {
            if (file.type === 'page') {
                pageFiles.push(file);
            } else if (file.type === 'code') {
                codeFiles.push(file);
            } else {
                assetFiles.push(file);
            }
        }

        const urlMap = new Map<string_uri, string_uri>();
        const registration = Registration.void();

        // 1️⃣ Linking assets to pages and making ObjectUrls
        for (const file of [...assetFiles, ...codeFiles]) {
            if (typeof file.content === 'string') {
                // TODO: Maybe do the replacement also for assets Blobs
                for (const [from, to] of Array.from(urlMap.entries())) {
                    file.content = file.content.split(from).join(to);
                }
            }

            const objectUrl = ObjectUrl.from(file.content, file.mimeType);
            registration.addSubdestroyable(objectUrl);

            urlMap.set(file.pathname, objectUrl.src);
        }

        // 2️⃣ Linking pages to each other and making ObjectUrls
        for (const file of pageFiles) {
            if (typeof file.content !== 'string') {
                throw new Error(`Unexpected file.content !== 'string' for file ${file.pathname}`);
            }

            const replacedStaticallyJavascript: Array<string_javascript> = [];

            for (const [from, to] of Array.from(urlMap.entries())) {
                file.content = file.content.split(from).join(to);
                replacedStaticallyJavascript.push(`console.log('🔗 Replacing statically', from, '->', to);`);
            }

            const dynamicallyReplaceLinksJavascript = spaceTrim(
                (blob) => `

                ${blob(replacedStaticallyJavascript.join('\n'))}

                // !!!! This urlMap MUST be dynamically generated after 2️⃣
                const urlMap = new Set(${JSON.stringify(Object.fromEntries(urlMap))});   
                
                const linkElements = Array.from(document.querySelectorAll('a'));
                for (const linkElement of linkElements) {

                    const href = linkElement.getAttribute('href');
                    if (!href) {
                        console.warn('Missing href attribute', linkElement);
                        continue;
                    }

                    const url = new URL(href, window.location.href);
                    if (!urlMap.has(url.href)) {
                        console.warn('Missing url in urlMap', {href, url,urlMap});
                        continue;
                    }

                    console.log('🔗 Replacing dynamically', href, '->', urlMap.get(url.href));
                    linkElement.setAttribute('href', urlMap.get(url.href));

                }


            `,
            );

            console.log('!!!! before', file.content);
            file.content = file.content
                .split(`</body>`)
                .join(`\n<script>\n${dynamicallyReplaceLinksJavascript}\n</script>\n</body>`);
            console.log('!!!! after', file.content);

            const objectUrl = ObjectUrl.from(file.content, file.mimeType);
            registration.addSubdestroyable(objectUrl);

            urlMap.set(file.pathname, objectUrl.src);

            if (file.pathname === 'index.html') {
                setIndexUrl(objectUrl.url);
            }
        }

        setUrlMap(urlMap);

        return () => {
            registration.destroy();
        };
    }, [exported]);
    // --------------

    console.info('🔽', { exported });

    return (
        <Modal title={'Export preview'}>
            {/*
            <pre
                // TODO: Make <DebugOutput/> component which supports multiple inputs like Set, Map, Array, Object, and also primitive values and promises and RxJS
                onClick={() => {
                    console.log(urlMap);
                }}
            >
                {JSON.stringify(Object.fromEntries(urlMap), null, 4)}
            </pre>
            */}
            {!indexUrl ? (
                `Loading...`
            ) : (
                <>
                    <input
                        // Note: Here can not be used simple <a/> link because blob: URL is not allowed to be used in <a/> href
                        className={styles.previewLink}
                        disabled
                        value={indexUrl.href}
                    />
                    <DeviceIframe className={styles.preview} src={indexUrl.href} isInteractive />
                </>
            )}
        </Modal>
    );
}

/**
 * TODO: Maybe make a component <FilesPreview files={exported} />
 */
