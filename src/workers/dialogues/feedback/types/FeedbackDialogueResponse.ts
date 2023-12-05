import type { LikedStatus } from '../../../../ai/recommendation/LikedStatus';
import type { AbstractDialogueResponse } from '../../../lib/dialogues/interfaces/AbstractDialogueResponse';

export type FeedbackDialogueResponse = AbstractDialogueResponse & {
    /**
     * result of the feedbackation
     */
    readonly likedStatus: LikedStatus;

    /**
     * Feedback from user
     *
     * @example "I don't like the color"
     */
    readonly note: string;
};

/**
 * TODO: !!!last [🧠] Maybe rename JUST to Feedback
 */
