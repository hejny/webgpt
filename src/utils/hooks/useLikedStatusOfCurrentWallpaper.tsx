import { useCurrentWallpaperId } from './useCurrentWallpaperId';
import { useStateInLocalstorage } from './useStateInLocalstorage';

export type LikedStatus = 'NONE' | 'LOVE' | 'LIKE' | 'NEUTRAL' | 'DISLIKE';

export function useLikedStatusOfCurrentWallpaper(): [LikedStatus, (likedStatus: LikedStatus) => void] {
    const wallpaperId = useCurrentWallpaperId();
    return useStateInLocalstorage<LikedStatus>(`likedStatus_${wallpaperId}`, 'NONE');
}
