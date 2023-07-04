import { IWallpaper } from '../../../src/utils/IWallpaper';
import { useCurrentWallpaperId } from './useCurrentWallpaperId';
import { useObservable } from './useObservable';
import { useWallpaperSubject } from './useWallpaperSubject';

/**
 * A function that returns a wallpaper component based on the router query
 */
export function useWallpaper(): [IWallpaper] {
    const wallpaperId = useCurrentWallpaperId();
    const wallpaperSubject = useWallpaperSubject(wallpaperId);
    const { value: wallpaper } = useObservable(wallpaperSubject);
    return [wallpaper];
}
