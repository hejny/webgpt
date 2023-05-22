import { BehaviorSubject } from 'rxjs';
import { JsonObject } from 'type-fest';
import { hydrateWallpaper } from './hydrateWallpaper';
import { IWallpaper } from './IWallpaper';
import { string_wallpaper_id } from './typeAliases';

export function hydrateWallpapers(
    wallpapersJson: Array<JsonObject & IWallpaper>,
): Record<string_wallpaper_id, BehaviorSubject<IWallpaper>> {
    const wallpapers: Record<string_wallpaper_id, BehaviorSubject<IWallpaper>> = {};

    for (const wallpaperJson of wallpapersJson) {
        wallpapers[wallpaperJson.id] = new BehaviorSubject<IWallpaper>(hydrateWallpaper(wallpaperJson));
    }

    return wallpapers;
}
