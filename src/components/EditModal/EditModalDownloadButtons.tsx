import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { exportAsHtml } from '../../export/exportAsHtml';
import { exportAsZip } from '../../export/exportAsZip';
import { getWallpaperBaseFilename } from '../../export/getWallpaperBaseFilename';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useObservable } from '../../utils/hooks/useObservable';
import { useWallpaperSubject } from '../../utils/hooks/useWallpaperSubject';

/**
 * @@
 */
export function EditModalDownloadButtons() {
    const wallpaperId = useCurrentWallpaperId();
    const wallpaperSubject = useWallpaperSubject(wallpaperId);
    const { value: wallpaper } = useObservable(wallpaperSubject);

    return (
        <>
            <button
                className={'button'}
                onClick={async () => {
                    /* not await */ induceFileDownload(
                        await exportAsZip(wallpaper, { publicUrl: new URL('https://example.com/') }),
                    );
                }}
            >
                Download as ZIP
            </button>

            <button
                className={'button'}
                onClick={async () => {
                    const { files } = await exportAsHtml(wallpaper, {
                        stylesPlace: 'EMBED',
                        publicUrl: new URL('https://example.com/'),
                    });
                    const indexHtml = files.find((file) => file.pathname === 'index.html');

                    if (!indexHtml) {
                        throw new Error('index.html not found');
                    }

                    if (files.length > 1) {
                        console.warn('There are more files than index.html but they can not be downloaded.');
                    }

                    const file = new File([indexHtml.content], getWallpaperBaseFilename(wallpaper) + '.html', {
                        type: 'text/html',
                    });
                    /* not await */ induceFileDownload(file);
                }}
            >
                Download as HTML
            </button>
        </>
    );
}
