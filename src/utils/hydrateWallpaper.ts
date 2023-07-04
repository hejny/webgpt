import { hydrateColorStats } from './image/utils/hydrateColorStats';
import { IWallpaper, IWallpaperSerialized } from './IWallpaper';

export function hydrateWallpaper(json: IWallpaperSerialized): IWallpaper {
    return { ...json, colorStats: hydrateColorStats(json.colorStats) } as IWallpaper;
}

/**
 * TODO: Check if the colorStats are valid
 */
