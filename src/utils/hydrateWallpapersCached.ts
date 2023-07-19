import { BehaviorSubject } from 'rxjs';
import { hydrateWallpaper } from './hydrateWallpaper';
import { IWallpaper, IWallpaperSerialized } from './IWallpaper';
import { string_wallpaper_id } from './typeAliases';

/**
 * @@@
 *
 * @private
 * @singleton
 */
const wallpapers: Record<string_wallpaper_id, BehaviorSubject<IWallpaper>> = {};

/**
 * @@@
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
