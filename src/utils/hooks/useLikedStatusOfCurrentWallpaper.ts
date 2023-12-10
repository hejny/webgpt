import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import type { LikedStatus } from '../../ai/recommendation/LikedStatus';
import { provideClientId } from '../client/provideClientId';
import { getSupabaseForBrowser } from '../supabase/getSupabaseForBrowser';
import { useCurrentWallpaperId } from './useCurrentWallpaperId';
import { useStateInLocalstorage } from './useStateInLocalstorage';

export function useLikedStatusOfCurrentWallpaper(): [LikedStatus, (likedStatus: LikedStatus) => void] {
    const wallpaperId = useCurrentWallpaperId();
    const [likedStatus, setLikedStatusInner] = useStateInLocalstorage<LikedStatus>(
        `likedStatus_${wallpaperId}`,
        'NONE',
    );

    const setLikedStatus = async (likedStatus: LikedStatus) => {
        setLikedStatusInner(likedStatus);

        /*
        TODO: 
        const currentWallpaperFeedback = getSupabaseForBrowser()
            .from('WallpaperFeedback')
            .select('*')
            .eq('wallpaperId', wallpaperId)
            .eq('author', provideClientId());

        */

        const insertResult = await getSupabaseForBrowser()
            .from('WallpaperFeedback')
            .insert({
                wallpaperId,
                likedStatus,
                author: await provideClientId({
                    isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.LIKE,
                }),
            });

        console.info({ insertResult });
    };

    return [likedStatus, setLikedStatus];
}

/**
 * TODO: !! Supabase should be main source of truth NOT just backup
 * TODO: !! Make reactions ONLY through this hook (or related logic) NOT sideways by directly writing to (local)storage
 */
