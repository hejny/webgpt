import { useRouter } from 'next/router';

/**
 * A function that returns current wallpaper id based on the router query
 */
export function useCurrentWallpaperId(): string {
    const router = useRouter();

    if (router.pathname === '/showcase/[slug]') {
        const wallpaperId = router.query.slug as string;

        if (typeof wallpaperId !== 'string') {
            throw new Error('Wallpaper id is not 1 string');
        }

        return wallpaperId;
    } else {
        throw new Error(`Hook useWallpaper can not be used on "${router.pathname}"`);
    }
}
