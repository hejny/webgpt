import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useEffect, useMemo, useState } from 'react';
import { exportAsHtml, HtmlExportFile } from '../../export/exportAsHtml';
import { usePromise } from '../../utils/hooks/usePromise';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { Modal } from '../Modal/Modal';
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
    // TODO: !!! useObjectUrl hook
    const [indexUrl, setIndexUrl] = useState<null | URL>(null);
    useEffect(() => {
        if (!exported) {
            return;
        }

        let pageFiles: Array<HtmlExportFile> = [];
        let scriptFiles: Array<HtmlExportFile> = [];
        let assetFiles: Array<HtmlExportFile> = [];

        for (const file of exported.files) {
            if (['html'].includes(file.type)) {
                pageFiles.push(file);
            } else if (['javascript', 'css'].includes(file.type)) {
                scriptFiles.push(file);
            } else {
                assetFiles.push(file);
            }
        }

        const urlMap: Record<string, string> = {};

        for (const file of [...assetFiles, ...scriptFiles, ...pageFiles]) {
            for (const [from, to] of Object.entries(urlMap)) {
                file.content = file.content.split(from).join(to);
            }

            const blob = new Blob([file.content], { type: 'text/html' });
            const objectUrl = ObjectUrl.fromBlob(blob);

            urlMap[file.pathname] = objectUrl.src;

            if (file.pathname === 'index.html') {
                setIndexUrl(objectUrl.url);
            }
        }

        /*
        !!!!!
        return () => {
            objectUrl.destroy();
        };
        */
    }, [exported]);
    // --------------

    console.info('🔽', { exported });

    return (
        <Modal title={'Export preview'}>
            {!indexUrl ? `Loading...` : <iframe className={styles.preview} src={indexUrl.href} />}
        </Modal>
    );
}

/**
 * TODO: Maybe make a component <FilesPreview files={exported} />
 */
