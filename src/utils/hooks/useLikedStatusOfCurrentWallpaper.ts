import { getSupabaseForBrowser } from '../supabase/getSupabaseForBrowser';
import { provideClientId } from '../supabase/provideClientId';
import { useCurrentWallpaperId } from './useCurrentWallpaperId';
import { useStateInLocalstorage } from './useStateInLocalstorage';

export const LikedStatus = {
    NONE: 'None',
    LOVE: '❤ Loved',
    LIKE: '👍 Liked',
    NEUTRAL: '😐 Neutral',
    DISLIKE: '👎 Disliked',
} as const;

export function useLikedStatusOfCurrentWallpaper(): [
    keyof typeof LikedStatus,
    (likedStatus: keyof typeof LikedStatus) => void,
] {
    const wallpaperId = useCurrentWallpaperId();
    const [likedStatus, setLikedStatusInner] = useStateInLocalstorage<keyof typeof LikedStatus>(
        `likedStatus_${wallpaperId}`,
        'NONE',
    );

    const setLikedStatus = async (likedStatus: keyof typeof LikedStatus) => {
        setLikedStatusInner(likedStatus);

        /*
        TODO: 
        const currentReaction = getSupabaseForBrowser()
            .from('Reaction')
            .select('*')
            .eq('wallpaperId', wallpaperId)
            .eq('author', provideClientId());

        */

        const reactionInsertResult = await getSupabaseForBrowser().from('Reaction').insert({
            wallpaperId,
            likedStatus,
            author: provideClientId(),
        });

        console.log({ reactionInsertResult });
    };

    return [likedStatus, setLikedStatus];
}

/**
 * TODO: !!! Supabase should be main source of truth NOT just backup
 * TODO: !!! Make reactions ONLY through this hook (or related logic) NOT sideways by directly writing to (local)storage
 */
