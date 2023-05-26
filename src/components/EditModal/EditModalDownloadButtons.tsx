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
                    /* not await */ induceFileDownload(await exportAsZip(wallpaper));
                }}
            >
                Download as ZIP
            </button>

            <button
                className={'button'}
                onClick={async () => {
                    const html = await exportAsHtml(wallpaper);
                    const file = new File([html], getWallpaperBaseFilename(wallpaper) + '.html', {
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
