import { useRouter } from 'next/router';
// !!! import { generated_wallpapers } from '../../../assets/ai/wallpaper';
// !!! import { ABlackAndWhiteOutlineOfAnAstronautExploring6cd3eee447af4316B49e3e9982df2b240_2_Image } from '../../../assets/ai/wallpaper/gallery/Pavol_Hejn_a_black_and_white_outline_of_an_astronaut_exploring__6cd3eee4-47af-4316-b49e-3e9982df2b24-0_2_Image';
import { IWallpaper } from '../../../assets/ai/wallpaper/IWallpaper';

/**
 * A function that returns a wallpaper component based on the router query ⁘
 *
 * @returns {IWallpaper} A wallpaper component.
 */
export function useWallpaper(): IWallpaper {
    const router = useRouter();

    return {} as any as IWallpaper;

    /* 

    if (router.pathname === '/') {
        return ABlackAndWhiteOutlineOfAnAstronautExploring6cd3eee447af4316B49e3e9982df2b240_2_Image;
    } else if (router.pathname === '/showcase/[slug]') {
        const wallpaperId = router.query.slug as string;

        if (typeof wallpaperId !== 'string') {
            throw new Error('Wallpaper id is not 1 string');
        }

        const wallpaper = generated_wallpapers.find((wallpaper) => wallpaper.metadata.id === wallpaperId)!;

        if (wallpaper) {
            return wallpaper;
        }

        throw new Error('Wallpaper not found' /* <- TODO: Make here propper 404 * /);

    } else {
        return ABlackAndWhiteOutlineOfAnAstronautExploring6cd3eee447af4316B49e3e9982df2b240_2_Image;

        // throw new Error(`Hook useWallpaper can not be used on "${router.pathname}"`);
    }

    */
}
