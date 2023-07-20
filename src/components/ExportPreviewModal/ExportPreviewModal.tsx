import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useEffect, useMemo, useState } from 'react';
import { exportAsHtml } from '../../export/exportAsHtml';
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

        for (const file of exported.files) {
            const blob = new Blob([file.content], { type: 'text/html' });
            const objectUrl = ObjectUrl.fromBlob(blob);

            if (file.pathname === 'index.html') {
                // TODO: !!! [🧠] How to link files together?
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
