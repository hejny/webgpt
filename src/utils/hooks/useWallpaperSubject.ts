import { useContext } from 'react';
import { BehaviorSubject } from 'rxjs';
import { IWallpaper } from '../IWallpaper';
import type { string_wallpaper_id } from '../typeAliases';
import { WallpapersContext } from './WallpapersContext';

/**
 * A function that returns a wallpaper as a BehaviorSubject which can be subscribed to or passed updated to
 */
export function useWallpaperSubject(wallpaperId: string_wallpaper_id): BehaviorSubject<IWallpaper> {
    const wallpapers = useContext(WallpapersContext);

    if (wallpapers === null) {
        throw new Error('You must pass wallpapers into <WallpapersContext.Provider>');
    }

    const wallpaper = wallpapers[wallpaperId];

    if (wallpaper) {
        return wallpaper;
    }

    throw new Error(`Wallpaper "${wallpaperId}" not found` /* <- TODO: Make here propper 404 */);
}
