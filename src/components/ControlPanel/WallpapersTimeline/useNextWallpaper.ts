import { useMemo } from 'react';
import { useCurrentWallpaperId } from '../../../utils/hooks/useCurrentWallpaperId';
import { usePromise } from '../../../utils/hooks/usePromise';
import { IWallpaperInStorage, WallpapersTimelineManager } from './WallpapersTimelineManager';

export function useNextWallpaper(): [randomWallpaper: IWallpaperInStorage | null, consumeRandomWallpaper: () => void] {
    const wallpaperId = useCurrentWallpaperId();

    const randomWallpaperPromise = useMemo(
        () => WallpapersTimelineManager.getInstance().getNextWallpaper(wallpaperId),
        [wallpaperId],
    );
    const { value } = usePromise(randomWallpaperPromise);
    return [value || null, () => WallpapersTimelineManager.getInstance().consumeRandomWallpaper(value!)];
}
