import { useMemo } from 'react';
import { useCurrentWallpaperId } from '../../../utils/hooks/useCurrentWallpaperId';
import { usePromise } from '../../../utils/hooks/usePromise';
import type { IWallpaperInStorage } from './RandomWallpaperManager';
import { RandomWallpaperManager } from './RandomWallpaperManager';

export function useRandomWallpaper(): [
    randomWallpaper: IWallpaperInStorage | null,
    consumeRandomWallpaper: () => void,
] {
    const wallpaperId = useCurrentWallpaperId();

    const randomWallpaperPromise = useMemo(
        () => RandomWallpaperManager.getInstance().getRandomWallpaper(),
        // Note: We want to call getRandomWallpaper for every new wallpaperId
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        [wallpaperId],
    );
    const { value: recommendedWallpaper } = usePromise(randomWallpaperPromise);

    console.info(`🎲 Use recommended wallpaper`, { recommendedWallpaper });

    return [
        recommendedWallpaper || null,
        () => {
            if (!recommendedWallpaper) {
                throw new Error('No wallpaper to consume');
            }
            RandomWallpaperManager.getInstance().consumeRandomWallpaper(recommendedWallpaper);
        },
    ];
}
