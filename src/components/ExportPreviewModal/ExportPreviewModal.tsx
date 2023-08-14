import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { Registration } from 'destroyable';
import { useEffect, useMemo, useState } from 'react';
import spaceTrim from 'spacetrim';
import { exportAsHtml } from '../../export/exportAsHtml';
import { HtmlExportFile } from '../../export/HtmlExportFile';
import { usePromise } from '../../utils/hooks/usePromise';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { randomUuid } from '../../utils/randomUuid';
import { string_javascript, string_uri } from '../../utils/typeAliases';
import { DeviceIframe } from '../DeviceIframe/DeviceIframe';
import { Modal } from '../Modal/00-Modal';
import styles from './ExportPreviewModal.module.css';
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

            urlMap.set('/' + file.pathname, objectUrl.src);
            urlMap.set(file.pathname, objectUrl.src);
        }

        // 2️⃣ Linking pages to each other and making ObjectUrls
        const broadcastChannelId = randomUuid();
        for (const file of pageFiles) {
            if (typeof file.content !== 'string') {
                throw new Error(`Unexpected file.content !== 'string' for file ${file.pathname}`);
            }

            const replacedStaticallyJavascript: Array<string_javascript> = [];

            for (const [from, to] of Array.from(urlMap.entries())) {
                if (file.content.split(from).length > 1) {
                    replacedStaticallyJavascript.push(
                        `console.info('🔗 Replacing statically', '${from}', '->', '${to}');`,
                    );
                }
                file.content = file.content.split(from).join(to);
            }

            const dynamicallyReplaceLinksJavascript = spaceTrim(
                (blob) => `

                    ${blob(replacedStaticallyJavascript.join('\n'))}

                    const channel = new BroadcastChannel('${broadcastChannelId}');
                    channel.onmessage = (event) => {
                        const { type, urlMap } = event.data;
                        if (type !== 'URL_MAP') {
                            return;
                        }

                        const linkElements = Array.from(window.document.querySelectorAll('a'));
                        for (const linkElement of linkElements) {

                            const isLinked = linkElement.getAttribute('data-linked');
                            if(isLinked){
                                continue;
                            }

                            const href = linkElement.getAttribute('href');

                            if(href.startsWith('blob:')){
                                continue;
                            }

                            if (!href) {
                                console.warn('Missing href attribute', linkElement);
                                continue;
                            }

                            if (!urlMap.has(href)) {
                                console.warn('Missing url in urlMap', {href, urlMap});
                                continue;
                            }

                            const from = href;
                            const to =  urlMap.get(from);
                            console.info('🔗 Replacing dynamically', from, '->', to);
                            linkElement.setAttribute('data-linked', 'true');
                            linkElement.setAttribute('href', to);
                            continue;
                        }
                    };
                    channel.postMessage({
                        type: 'REQUEST_URL_MAP',
                    });

                `,
            );

            file.content = file.content
                .split(`</body>`)
                .join(`\n<script>\n${dynamicallyReplaceLinksJavascript}\n</script>\n</body>`);

            const objectUrl = ObjectUrl.from(file.content, file.mimeType);
            registration.addSubdestroyable(objectUrl);

            urlMap.set('/' + file.pathname, objectUrl.src);
            urlMap.set(file.pathname, objectUrl.src);

            if (file.pathname === 'index.html') {
                urlMap.set('/', objectUrl.src);
                urlMap.set('', objectUrl.src);
                setIndexUrl(objectUrl.url);
            }
        }

        const channel = new BroadcastChannel(broadcastChannelId);
        channel.onmessage = (event) => {
            const { type } = event.data;
            if (type !== 'REQUEST_URL_MAP') {
                return;
            }

            channel.postMessage({
                type: 'URL_MAP',
                urlMap,
            });
        };

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
