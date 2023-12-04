import type { LikedStatus } from '../../../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import type { AbstractDialogueResponse } from '../../../lib/dialogues/interfaces/AbstractDialogueResponse';

export type FeedbackDialogueResponse = AbstractDialogueResponse & {
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
 * TODO: !!!last [🧠] Maybe rename JUST to Feedback
 * Note: !!!last [🤽‍♀️]
 */
