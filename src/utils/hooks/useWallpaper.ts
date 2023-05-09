import { useRouter } from 'next/router';
import { generated_wallpapers } from '../../../assets/ai/wallpaper';
import { IWallpaperComponent } from '../../../assets/ai/wallpaper/IWallpaperComponent';

/**
 * A function that returns a wallpaper component based on the router query ⁘
 *
 * @returns {IWallpaperComponent} A wallpaper component.
 */
export function useWallpaper(): IWallpaperComponent | null {
    const router = useRouter();
    const { wallpaper: wallpaperId } = router.query;

    if (!router.isReady) {
        return null;
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
