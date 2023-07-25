import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { Registration } from 'destroyable';
import { useEffect, useMemo, useState } from 'react';
import { exportAsHtml } from '../../export/exportAsHtml';
import { HtmlExportFile } from '../../export/HtmlExportFile';
import { usePromise } from '../../utils/hooks/usePromise';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { string_uri } from '../../utils/typeAliases';
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

        for (const file of [...assetFiles, ...codeFiles, ...pageFiles]) {
            if (typeof file.content === 'string') {
                // TODO: Maybe do the replacement also for assets Blobs
                for (const [from, to] of Array.from(urlMap.entries())) {
                    file.content = file.content.split(from).join(to);
                }
            }

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
            {!indexUrl ? `Loading...` : <DeviceIframe className={styles.preview} src={indexUrl.href} isInteractive />}
        </Modal>
    );
}

/**
 * TODO: Maybe make a component <FilesPreview files={exported} />
 */
