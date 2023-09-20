import { BehaviorSubject } from 'rxjs';
import { hydrateWallpaper } from './hydrateWallpaper';
import { IWallpaper, IWallpaperSerialized } from './IWallpaper';
import type { string_wallpaper_id } from './typeAliases';

/**
 * Cache of wallpapers to hydrate
 *
 * @private
 * @singleton
 */
const wallpapers: Record<string_wallpaper_id, BehaviorSubject<IWallpaper>> = {};

/**
 * Hydrates the wallpapers cache with the provided wallpapers
 *
 * @param {Array<IWallpaperSerialized>} wallpapersJson - The serialized wallpapers.
 * @returns {Record<string, BehaviorSubject<IWallpaper>>} - The hydrated wallpapers cache.
 */
export function hydrateWallpapersCached(
    wallpapersJson: Array<IWallpaperSerialized>,
): Record<string_wallpaper_id, BehaviorSubject<IWallpaper>> {
    for (const wallpaperJson of wallpapersJson) {
        if (!wallpapers[wallpaperJson.id]) {
            wallpapers[wallpaperJson.id] = new BehaviorSubject<IWallpaper>(hydrateWallpaper(wallpaperJson));
        }
    }

    return wallpapers;
}
