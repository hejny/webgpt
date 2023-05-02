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
    return generated_wallpapers.find((wallpaper) => wallpaper.metadata.id === '56f04b34-9209-4d6f-b465-a0682df3286e')!;
}
