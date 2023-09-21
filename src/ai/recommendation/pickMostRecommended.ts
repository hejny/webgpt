import type { IWallpaper } from '../../utils/IWallpaper';
import type { number_likeness } from '../../utils/typeAliases';
import type { IWallpaperVector } from './IWallpaperVector';
import { wallpaperToVector } from './wallpaperToVector';
import { wallpaperVectorsDistanceSquared } from './wallpaperVectorsDistanceSquared';

interface PickMostRecommendedOptions {
    wallpapersWithLikeness: Array<IWallpaper & { likeness: number_likeness }>;
    wallpapersToPick: Array<IWallpaper>;
}

/**
 * Picks the best wallpapers for the user according to his previous reactions
 * It takes object with two properties:
 * - `wallpapersWithLikeness` contains all previous reactions with likeness key where 0 means no opinion, positive means positive opinion and negative means negative opinion, higher value means higher likeness.
 * - `wallpapersToPick` contains pool of every possible wallpaper to recommend - returns one item from it
 *
 * @generator https://chat.openai.com/share/85e3fb2c-a1fe-4e0b-8236-756e6e9340c4
 */
export function pickMostRecommended(options: PickMostRecommendedOptions): IWallpaper {
    const { wallpapersWithLikeness, wallpapersToPick } = options;

    if (wallpapersToPick.length === 0) {
        throw new Error(`No wallpaper to pick`);
    }

    const wallpaperVectors: Map<IWallpaper, IWallpaperVector> = new Map();

    for (const wallpaper of [...wallpapersToPick, ...wallpapersWithLikeness]) {
        wallpaperVectors.set(wallpaper, wallpaperToVector(wallpaper));
    }

    let bestWallpaper: IWallpaper | null = null;
    let bestScore = -Infinity;

    for (const wallpaperToPick of wallpapersToPick) {
        let totalScore = 0;

        for (const wallpaperWithLikeness of wallpapersWithLikeness) {
            const likeness = wallpaperWithLikeness.likeness;
            const distanceSquared = wallpaperVectorsDistanceSquared(
                wallpaperVectors.get(wallpaperToPick)!,
                wallpaperVectors.get(wallpaperWithLikeness)!,
            );
            totalScore += likeness / (1 + distanceSquared);
        }

        if (totalScore > bestScore) {
            bestScore = totalScore;
            bestWallpaper = wallpaperToPick;
        }
    }

    if (bestWallpaper === null) {
        throw new Error(`Failed to pick the most recommended wallpaper`);
    }

    return bestWallpaper;
}

/**
 * TODO: [🤺] Optimize
 */
