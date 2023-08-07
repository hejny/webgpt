import { IWallpaper } from '../utils/IWallpaper';
import { number_likeness } from '../utils/typeAliases';

interface PickMostRecommendedOptions {
    wallpapersWithLikeness: Array<IWallpaper & { likeness: number_likeness }>;
    wallpapersToPick: Array<IWallpaper>;
}

export function pickMostRecommended(options: PickMostRecommendedOptions): IWallpaper {
    const { wallpapersWithLikeness, wallpapersToPick } = options;

    if (wallpapersToPick.length === 0) {
        throw new Error(`No wallpaper to pick`);
    }

    // !!!! Implement
    // wallpapers!.sort((a, b) => recommendLeverOfWallpaper(a as any) - recommendLeverOfWallpaper(b as any));

    return wallpapersToPick[0];
}

/**
 * TODO: [🤺] Optimize
 */
