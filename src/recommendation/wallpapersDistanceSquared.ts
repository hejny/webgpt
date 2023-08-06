import { IWallpaperVector } from './IWallpaperVector';
import { wallpaperToVector } from './wallpaperToVector';

export function wallpapersDistanceSquared(wallpaper1: IWallpaperVector, wallpaper2: IWallpaperVector): number {
    const vector1 = wallpaperToVector(wallpaper1);
    const vector2 = wallpaperToVector(wallpaper2);

    if (vector1.length !== vector2.length) {
        throw new Error(`Wallpapers are in different dimension space`);
    }

    let sumOfPowers = 0;
    for (let dimension = 0; dimension < vector1.length; dimension++) {
        sumOfPowers += Math.pow(vector1[dimension] - vector2[dimension], 2);
    }

    return sumOfPowers;
}
