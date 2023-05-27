import JSZip from 'jszip';
import { IWallpaper } from '../utils/IWallpaper';
import { exportAsHtml } from './exportAsHtml';
import { getWallpaperBaseFilename } from './getWallpaperBaseFilename';
import { blobToFile } from './utils/blobToFile';

export async function exportAsZip(wallpaper: IWallpaper): Promise<File> {
    const zip = new JSZip();

    const { files } = await exportAsHtml(wallpaper, { stylesPlace: 'EXTERNAL' });
    // TODO: !!! Extract css to separate file
    // TODO: !!! Materialize assets
    // TODO: !!! Prettify all files

    for (const file of files) {
        zip.file(file.pathname, file.content);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const file = blobToFile(blob, getWallpaperBaseFilename(wallpaper) + '.zip');

    return file;
}
