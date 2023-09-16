import { useMemo } from 'react';
import { exportAsHtml } from '../../export/exportAsHtml';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { usePromise } from '../../utils/hooks/usePromise';
import { Files } from '../Files/00-FilesPreview';
import { Modal } from '../Modal/00-Modal';

/**
 * Renders the modal for exporting wallpaper page as code
 */
export function ExportCodeModal() {
    const [wallpaper] = useCurrentWallpaper();

    /**
     * Memoized promise for exporting wallpaper as HTML
     *
     * @type {Promise<any>}
     */
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
        <Modal title={'Export in code editor'} isCloseable>
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
