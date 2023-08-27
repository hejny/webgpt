import { IWallpaper } from '../../utils/IWallpaper';
import { IWallpaperVector } from './IWallpaperVector';

export function wallpaperToVector(wallpaper: IWallpaper): IWallpaperVector {
    const { red, green, blue } = wallpaper.colorStats.palette[0]!.value;
    return [red, green, blue];
}

/**
 * TODO: [🤺] Optimize
 */
