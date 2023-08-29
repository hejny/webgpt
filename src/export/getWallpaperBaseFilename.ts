import { normalizeToKebabCase } from 'n12';
import { IWallpaper } from '../utils/interfaces/IWallpaper';

/**
 * Function that returns the base filename of a wallpaper
 *
 *
 * @param wallpaper - The wallpaper object.
 * @returns The base filename of the wallpaper.
 */
export function getWallpaperBaseFilename(wallpaper: IWallpaper): string {
    return normalizeToKebabCase(wallpaper.title);
}
