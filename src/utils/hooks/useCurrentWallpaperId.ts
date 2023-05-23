import { useRouter } from 'next/router';

/**
 * A function that returns current wallpaper id based on the router query
 */
export function useCurrentWallpaperId(): string {
    const router = useRouter(/* <- TODO: !!! Go througl all usages for same error */);

    if (router.events) {
        // TODO: Remove !!! logs after seen on production

        router.events.on('routeChangeComplete', () => {
            const wallpaperId = router.query.slug as string;
            console.log('!!! routeChangeComplete', wallpaperId);
        });

        router.events.on('routeChangeStart', () => {
            const wallpaperId = router.query.slug as string;
            console.log('!!! routeChangeStart', wallpaperId);
        });
    }

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
