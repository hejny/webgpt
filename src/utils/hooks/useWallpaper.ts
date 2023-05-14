import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { hydrateWallpaper } from '../../../assets/ai/wallpaper/hydrateWallpaper';
// import { ABlackAndWhiteOutlineOfAnAstronautExploring6cd3eee447af4316B49e3e9982df2b240_2_Image } from '../../../assets/ai/wallpaper/gallery/Pavol_Hejn_a_black_and_white_outline_of_an_astronaut_exploring__6cd3eee4-47af-4316-b49e-3e9982df2b24-0_2_Image';
import { IWallpaper } from '../../../assets/ai/wallpaper/IWallpaper';

export const WallpapersContext = createContext<Array<IWallpaper>>([]);

/**
 * A function that returns a wallpaper component based on the router query ⁘
 *
 * @returns {IWallpaper} A wallpaper component.
 */
export function useWallpaper(): IWallpaper {
    const wallpapers = useContext(WallpapersContext);
    const router = useRouter();

    const defaultWallpaper = hydrateWallpaper(wallpapers[0]); // !!!! ABlackAndWhiteOutlineOfAnAstronautExploring6cd3eee447af4316B49e3e9982df2b240_2_Image;

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
            return hydrateWallpaper(wallpaper);
        }

        throw new Error('Wallpaper not found' /* <- TODO: Make here propper 404 */);
    } else {
        return defaultWallpaper;
        // throw new Error(`Hook useWallpaper can not be used on "${router.pathname}"`);
    }
}
