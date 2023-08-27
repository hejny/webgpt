import { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { number_likeness } from '../../utils/typeAliases';

const LIKED_STATUS_LIKENESS: Record<keyof typeof LikedStatus, number_likeness> = {
    NONE: 0 /* <- TODO: [🧠] Maybe -0.1 or some small negative number, wallpaper user go through and did not react person maybe dislike */,
    LOVE: 3 /* <- TODO: [🧠] What is the best number here */,
    LIKE: 1,
    NEUTRAL: 0 /* <- TODO: [🧠] Maybe -0.1 or some small negative number, wallpaper user go through react 😐 person maybe dislike */,
    DISLIKE: -1 /* <- TODO: [🧠] Maybe more than -1 */,
};

export function likedStatusToLikeness(likedStatus: keyof typeof LikedStatus): number_likeness {
    return LIKED_STATUS_LIKENESS[likedStatus];
}

/**
 * TODO: Maybe put LIKED_STATUS_LIKENESS into config
 */
