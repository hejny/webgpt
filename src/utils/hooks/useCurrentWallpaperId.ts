import { useRouter } from 'next/router';
import { string_wallpaper_id } from '../typeAliases';

/**
 * A function that returns current wallpaper id based on the router query
 */
export function useCurrentWallpaperId(): string_wallpaper_id {
    const router = useRouter();

    if (router.pathname === '/[wallpaperId]') {
        const wallpaperId = router.query.wallpaperId as string;

        if (typeof wallpaperId !== 'string') {
            console.error('[📌]', { wallpaperId });
            throw new Error('Wallpaper id is not 1 string, [📌] see more in console.');
        }

        return wallpaperId;
    } else {
        throw new Error(`Hook useWallpaper can not be used on path "${router.pathname}"`);
    }
}
