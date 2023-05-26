import { normalizeToKebabCase } from 'n12';
import { IWallpaper } from '../utils/IWallpaper';

/**
 * @@@
 *
 * @param wallpaper
 * @returns filename BUT not extension
 */
export function getWallpaperBaseFilename(wallpaper: IWallpaper): string {
    return normalizeToKebabCase(wallpaper.title);
}
