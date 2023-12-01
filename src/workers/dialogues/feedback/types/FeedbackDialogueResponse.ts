import type { LikedStatus } from '../../../../utils/hooks/useLikedStatusOfCurrentWallpaper';

export type FeedbackDialogueResponse = {
    /**
     * result of the feedbackation
     */
    readonly likedStatus: keyof typeof LikedStatus;

    /**
     * Feedback from user
     *
     * @example "I don't like the color"
     */
    readonly note: string;
};

/**
 * TODO: !!! [🧠] Maybe rename JUST to Feedback
 * Note: [🤽‍♀️]
 */
