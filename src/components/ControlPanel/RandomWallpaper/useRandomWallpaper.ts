import { useMemo } from 'react';
import { useCurrentWallpaperId } from '../../../utils/hooks/useCurrentWallpaperId';
import { usePromise } from '../../../utils/hooks/usePromise';
import { IWallpaperInStorage, randomWallpaperManager } from './RandomWallpaperManager';

export function useRandomWallpaper(): [
    randomWallpaper: IWallpaperInStorage | null,
    consumeRandomWallpaper: () => void,
] {
    const wallpaperId = useCurrentWallpaperId();

    const randomWallpaperPromise = useMemo(
        () => randomWallpaperManager!.getRandomWallpaper(wallpaperId),
        [wallpaperId],
    );
    const { value } = usePromise(randomWallpaperPromise);
    return [value || null, () => randomWallpaperManager!.consumeRandomWallpaper(value!)];
}
