import { useMemo } from 'react';
import { usePromise } from '../../../utils/hooks/usePromise';
import { IWallpaper } from '../../../utils/IWallpaper';
import { RandomWallpaperManager } from './RandomWallpaperManager';

let randomWallpaperManager: RandomWallpaperManager | null = null;

export function useRandomWallpaper(): IWallpaper | null {
    if (!randomWallpaperManager) {
        randomWallpaperManager = new RandomWallpaperManager();
    }
    const randomWallpaperPromise = useMemo(() => randomWallpaperManager!.getRandomWallpaper(), []);
    const { value } = usePromise(randomWallpaperPromise);
    return value || null;
}
