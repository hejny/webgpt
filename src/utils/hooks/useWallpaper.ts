import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { IWallpaper } from '../../../assets/ai/wallpaper/IWallpaper';
import { DEFAULT_WALLPAPER_ID } from '../../../config';

export const WallpapersContext = createContext<Array<IWallpaper>>([]);

/**
 * A function that returns a wallpaper component based on the router query ⁘
 *
 * @returns {IWallpaper} A wallpaper component.
 */
export function useWallpaper(): IWallpaper {
    const wallpapers = useContext(WallpapersContext);
    const router = useRouter();

    const defaultWallpaper = wallpapers.find(({ id }) => id === DEFAULT_WALLPAPER_ID);

    if (wallpapers.length === 0) {
        throw new Error('Wallpapers are not loaded yet OR you have not provided wallpapers through WallpapersContext.');
    }

    if (router.pathname === '/') {
        return defaultWallpaper;
    } else if (router.pathname === '/showcase/[slug]') {
        const wallpaperId = router.query.slug as string;

        if (typeof wallpaperId !== 'string') {
            throw new Error('Wallpaper id is not 1 string');
        }

        const wallpaper = wallpapers.find((wallpaper) => wallpaper.id === wallpaperId)!;

        if (wallpaper) {
            return wallpaper;
        }

        throw new Error('Wallpaper not found' /* <- TODO: Make here propper 404 */);
    } else {
        return defaultWallpaper;
        // throw new Error(`Hook useWallpaper can not be used on "${router.pathname}"`);
    }
}
