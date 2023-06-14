import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useMemo, useState } from 'react';
import { exportAsHtml } from '../../export/exportAsHtml';
import { exportAsZip } from '../../export/exportAsZip';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { usePromise } from '../../utils/hooks/usePromise';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { Files } from '../Files/Files';
import { Modal } from '../Modal/Modal';
import styles from './ExportModal.module.css';

interface ExportModalProps {}

/**
 * @@
 */
export function ExportModal(props: ExportModalProps) {
    const wallpaper = useWallpaper();
    const [publicUrl, setPublicUrl] = useState<null | URL>(null);
    const exportedPromise = useMemo(() => {
        if (publicUrl === null) {
            return null;
        }

        return /* not await */ exportAsHtml(wallpaper, { stylesPlace: 'EXTERNAL', publicUrl });
    }, [publicUrl, wallpaper]);
    const { value: exported } = usePromise(exportedPromise);

    console.log('🔽', { exported });

    return (
        <Modal title={'Export'}>
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

            <Files
                files={
                    exported
                        ? exported.files
                        : [
                              {
                                  type: 'OTHER',
                                  pathname: 'README.md',
                                  content: `Select your URL and download the project. Then, upload it to your hosting.`,
                              },
                          ]
                }
            />
        </Modal>
    );
}

/**
 * TODO: !!! Modals export + advanced export + registration + info
 * TODO: !!! Design of export modal
 * TODO: Syntax highlighting
 * TODO: Registration should return some token which will be put into export
 * TODO: Each build should have unique id + build metadata (like date, aiai version, etc.)
 */
