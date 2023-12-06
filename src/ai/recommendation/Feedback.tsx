import type { LikedStatus } from './LikedStatus';

/**
 * Feedback is a qualitative and quantitative combination of liked status ❤👍😐👎😡 with a note.
 */
export interface Feedback {
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
}
