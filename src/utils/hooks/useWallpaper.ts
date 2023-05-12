import { useRouter } from 'next/router';
import { generated_wallpapers } from '../../../assets/ai/wallpaper';
import { ABlackAndWhiteOutlineOfAnAstronautExploring6cd3eee447af4316B49e3e9982df2b240_2_Image } from '../../../assets/ai/wallpaper/gallery/Pavol_Hejn_a_black_and_white_outline_of_an_astronaut_exploring__6cd3eee4-47af-4316-b49e-3e9982df2b24-0_2_Image';
import { IWallpaperComponent } from '../../../assets/ai/wallpaper/IWallpaperComponent';

/**
 * A function that returns a wallpaper component based on the router query ⁘
 *
 * @returns {IWallpaperComponent} A wallpaper component.
 */
export function useWallpaper(): IWallpaperComponent {
    const router = useRouter();
    const { wallpaper: wallpaperId } = router.query; /* <- TODO: !!! [🕰]  Use here path AND do not allow null */

    if (!router.isReady) {
        return ABlackAndWhiteOutlineOfAnAstronautExploring6cd3eee447af4316B49e3e9982df2b240_2_Image;
    }

    const Wallpaper = generated_wallpapers.find((wallpaper) => wallpaper.metadata.id === wallpaperId)!;

    if (Wallpaper) {
        return Wallpaper;
    }
    const fallbackWallpaper = generated_wallpapers.find(
        (wallpaper) => wallpaper.metadata.id === '7e9b434d-59bc-4d69-a486-d7401d94f5e0',
    );

    if (!fallbackWallpaper) {
        throw new Error('Fallback wallpaper not found');
    }

    return fallbackWallpaper;
}
