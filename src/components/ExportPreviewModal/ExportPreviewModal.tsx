import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useMemo, useState } from 'react';
import { exportAsHtml } from '../../export/exportAsHtml';
import { exportAsZip } from '../../export/exportAsZip';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { usePromise } from '../../utils/hooks/usePromise';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { Modal } from '../Modal/Modal';
import styles from './ExportPreviewModal.module.css';

interface ExportPreviewModalProps {}

/**
 * @@
 */
export function ExportPreviewModal(props: ExportPreviewModalProps) {
    const [wallpaper] = useWallpaper();
    const [publicUrl, setPublicUrl] = useState<null | URL>(null);
    const exportedPromise = useMemo(() => {
        if (publicUrl === null) {
            return null;
        }

        return /* not await */ exportAsHtml(wallpaper, { stylesPlace: 'EXTERNAL', publicUrl });
    }, [publicUrl, wallpaper]);
    const { value: exported } = usePromise(exportedPromise);

    console.info('🔽', { exported });

    return (
        <Modal title={'Export preview'}>
            <div className={styles.settings}>
                <label className={styles.setting}>
                    Your URL:&nbsp;&nbsp;
                    <input
                        onChange={(e) => {
                            setPublicUrl(new URL(e.target.value));
                        }}
                        placeholder="https://www.your-awesome-project.com/"
                        type="text"
                    />
                </label>

                <label className={styles.setting}>
                    <button
                        className={'button'}
                        disabled={publicUrl === null}
                        onClick={async () => {
                            if (!publicUrl) {
                                alert('Please enter your URL');
                                return;
                            }

                            // TODO: !!! Make registration here

                            /* not await */ induceFileDownload(await exportAsZip(wallpaper, { publicUrl }));
                        }}
                    >
                        Download as .zip
                    </button>
                </label>
            </div>

            <iframe src=""></iframe>
            {/* <FilesPreview files={exported} /> */}
        </Modal>
    );
}

/**
 * TODO: !!! This is unused - use or remove
 * TODO: !!! DRY with ExportModal
 */
