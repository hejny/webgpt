import type { IWallpaperVector } from './IWallpaperVector';

export function wallpaperVectorsDistanceSquared(
    wallpaperVector1: IWallpaperVector,
    wallpaperVector2: IWallpaperVector,
): number {
    if (wallpaperVector1.length !== wallpaperVector2.length) {
        throw new Error(`Wallpapers are in different dimension space`);
    }

    let sumOfPowers = 0;
    for (let dimension = 0; dimension < wallpaperVector1.length; dimension++) {
        sumOfPowers += Math.pow(wallpaperVector1[dimension]! - wallpaperVector2[dimension]!, 2);
    }

    return sumOfPowers;
}

/**
 * TODO: [🤺] Optimize
 */
