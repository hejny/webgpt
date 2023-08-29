import { useMemo } from 'react';
import { IWallpaper } from '../interfaces/IWallpaper';
import { useCurrentWallpaperId } from './useCurrentWallpaperId';
import { useWallpaperSubject } from './useWallpaperSubject';

type IWallpaperToModify = Omit<IWallpaper, 'title' /* <- Note: [🗄] Ommiting values computed here */>;
type IModifyWallpaper = (modifiedWallpaper: IWallpaperToModify) => IWallpaperToModify;

/**
 * A function that returns an original wallpaper without any modifications from user
 * If the wallpaper is modified and saved, the original wallpaper then becomes the new wallpaper
 */
export function useLastSavedWallpaper(): IWallpaper {
    const wallpaperId = useCurrentWallpaperId();
    const wallpaperSubject = useWallpaperSubject(wallpaperId);
    return useMemo(
        () => wallpaperSubject.value,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            // Note: Empty dependency array is intentional - we want to get the value only once and then keep it
        ],
    );
}

/**
 * TODO: Implement more robust version of this hook - if it is not used initially, it will not work properly
 */
