import { useCurrentWallpaperId } from './useCurrentWallpaperId';
import { useStateInLocalstorage } from './useStateInLocalstorage';

export type LikedStatus = 'LOVE' | 'LIKE' | 'DISLIKE' | 'NONE';

export function useLikedStatusOfCurrentWallpaper(): [LikedStatus, (likedStatus: LikedStatus) => void] {
    const wallpaperId = useCurrentWallpaperId();
    return useStateInLocalstorage<LikedStatus>(`likedStatus_${wallpaperId}`, 'NONE');
}

/**
 * !!!!!! Do not Switch when switching wallpapers
 */
