import JSZip from 'jszip';
import { IWallpaper } from '../utils/IWallpaper';
import { exportAsHtml } from './exportAsHtml';
import { getWallpaperBaseFilename } from './getWallpaperBaseFilename';
import { blobToFile } from './utils/blobToFile';

export async function exportAsZip(wallpaper: IWallpaper): Promise<File> {
    const zip = new JSZip();

    const html = await exportAsHtml(wallpaper);
    // TODO: !!! Extract css to separate file
    // TODO: !!! Materialize assets
    // TODO: !!! Prettify all files

    zip.file('index.html', html);
    const blob = await zip.generateAsync({ type: 'blob' });
    const file = blobToFile(blob, getWallpaperBaseFilename(wallpaper) + '.zip');

    return file;
}
