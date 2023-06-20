import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useState } from 'react';
import { exportAsZip } from '../../export/exportAsZip';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { Modal } from '../Modal/Modal';
import styles from './ExportModal.module.css';

interface ExportModalProps {}

/**
 * @@
 */
export function ExportModal(props: ExportModalProps) {
    const wallpaper = useWallpaper();
    const [publicUrl, setPublicUrl] = useState<null | URL>(null);

    return (
        <Modal title={'Get the web'}>
            <div className={styles.settings}>
                <div className={styles.setting}>
                    Your URL:&nbsp;&nbsp;
                    <input
                        onChange={(e) => {
                            setPublicUrl(new URL(e.target.value));
                        }}
                        placeholder="https://www.your-awesome-project.com/"
                        type="text"
                    />
                </div>

                <div className={styles.setting}>
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
                </div>
            </div>
        </Modal>
    );
}

/**
 * TODO: !!! Design of export modal
 * TODO: Registration should return some token which will be put into export
 * TODO: Each build should have unique id + build metadata (like date, aiai version, etc.)
 */
