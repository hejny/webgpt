import { useMemo } from 'react';
import { useCurrentWallpaperId } from '../../../utils/hooks/useCurrentWallpaperId';
import { usePromise } from '../../../utils/hooks/usePromise';
import { IWallpaperInStorage, RandomWallpaperManager } from './RandomWallpaperManager';

export function useRandomWallpaper(): [
    randomWallpaper: IWallpaperInStorage | null,
    consumeRandomWallpaper: () => void,
] {
    const wallpaperId = useCurrentWallpaperId();

    const randomWallpaperPromise = useMemo(
        () => RandomWallpaperManager.getInstance().getRandomWallpaper(),
        // Note: !!!!
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        [wallpaperId],
    );
    const { value } = usePromise(randomWallpaperPromise);
    return [value || null, () => RandomWallpaperManager.getInstance().consumeRandomWallpaper(value!)];
}
