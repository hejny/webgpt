import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useWallpaperLinkQuery } from './useWallpaperLinkQuery';

/**
 * Hook that returns a function that closes the wallpaper modal in the wallpaper route
 */
export function useCloseWallpaperModalHandler() {
    const router = useRouter();
    const query = useWallpaperLinkQuery({ modal: null });
    return useCallback(
        () => {
            router.push('/[wallpaperId]', { query });
        },
        // Note: No need to add `query` to the dependencies because it always stays the same
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router],
    );
}
