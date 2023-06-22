import { useCurrentWallpaperId } from './useCurrentWallpaperId';
import { useStateInLocalstorage } from './useStateInLocalstorage';

export type LikedStatus = 'NONE' | 'LOVE' | 'LIKE' | 'NEUTRAL' | 'DISLIKE';

export const LikedStatus = {
    NONE: 'None',
    LOVE: '❤ Loved',
    LIKE: '👍 Liked',
    NEUTRAL: '😐 Neutral',
    DISLIKE: '👎 Disliked',
} as const;

export function useLikedStatusOfCurrentWallpaper(): [LikedStatus, (likedStatus: keyof typeof LikedStatus) => void] {
    const wallpaperId = useCurrentWallpaperId();
    return useStateInLocalstorage<LikedStatus>(`likedStatus_${wallpaperId}`, 'NONE');
}
