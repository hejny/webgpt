import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useMemo } from 'react';
import { exportAsHtml } from '../../export/exportAsHtml';
import { usePromise } from '../../utils/hooks/usePromise';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { Files } from '../Files/00-FilesPreview';
import { Modal } from '../Modal/00-Modal';

interface ExportCodeModalProps {}

/**
 * @@
 */
export function ExportCodeModal(props: ExportCodeModalProps) {
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

    console.info('🔽', { exported });

    return (
        <Modal title={'Export in code editor'}>
            <Files
                files={
                    exported
                        ? exported.files
                        : [
                              {
                                  type: 'other',
                                  mimeType: 'text/markdown',
                                  pathname: 'README.md',
                                  content: `Select your URL and download the project. Then, upload it to your hosting.`,
                              },
                          ]
                }
            />
        </Modal>
    );
}
