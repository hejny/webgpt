import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { IWallpaper } from '../../../src/utils/IWallpaper';

export const WallpapersContext = createContext<Array<IWallpaper>>([]);

/**
 * A function that returns a wallpaper component based on the router query ⁘
 *
 * @returns {IWallpaper} A wallpaper component.
 */
export function useWallpaper(): IWallpaper {
    const wallpapers = useContext(WallpapersContext);
    const router = useRouter();

    if (wallpapers.length === 0) {
        throw new Error('Wallpapers are not loaded yet OR you have not provided wallpapers through WallpapersContext.');
    }

    if (router.pathname === '/showcase/[slug]') {
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
        throw new Error(`Hook useWallpaper can not be used on "${router.pathname}"`);
    }
}
