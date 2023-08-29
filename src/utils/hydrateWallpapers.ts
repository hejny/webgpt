import { BehaviorSubject } from 'rxjs';
import { hydrateWallpaper } from './hydrateWallpaper';
import { IWallpaper, IWallpaperSerialized } from './IWallpaper';
import { string_wallpaper_id } from './typeAliases';

export function hydrateWallpapers(
    wallpapersJson: Array<IWallpaperSerialized>,
): Record<string_wallpaper_id, BehaviorSubject<IWallpaper>> {
    const wallpapers: Record<string_wallpaper_id, BehaviorSubject<IWallpaper>> = {};

    for (const wallpaperJson of wallpapersJson) {
        wallpapers[wallpaperJson.id] = new BehaviorSubject<IWallpaper>(hydrateWallpaper(wallpaperJson));
    }

    return wallpapers;
}
