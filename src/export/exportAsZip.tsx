import JSZip from 'jszip';
import { IWallpaper } from '../utils/IWallpaper';
import { exportAsHtml } from './exportAsHtml';
import { getWallpaperBaseFilename } from './getWallpaperBaseFilename';
import { blobToFile } from './utils/blobToFile';

export async function exportAsZip(wallpaper: IWallpaper): Promise<File> {
    const zip = new JSZip();

    zip.file('index.html', await exportAsHtml(wallpaper));
    const blob = await zip.generateAsync({ type: 'blob' });
    const file = blobToFile(blob, getWallpaperBaseFilename(wallpaper) + '.zip');

    return file;
}
