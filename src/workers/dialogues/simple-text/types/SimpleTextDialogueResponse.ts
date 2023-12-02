import type { AbstractDialogueResponse } from '../../../lib/dialogues/interfaces/AbstractDialogueResponse';
import type { FeedbackDialogueResponse } from '../../feedback/types/FeedbackDialogueResponse';

export type SimpleTextDialogueResponse = AbstractDialogueResponse & {
    /**
     * Answer to the prompt
     *
     * - `null` means that the prompt is answered with `null`
     * - `string` means the answer to the prompt
     */
    readonly answer: string | null;

    /**
     * Feedback from user
     */
    readonly feedback?: FeedbackDialogueResponse;
};

/**
 * TODO: !!! Change to types, add ResponseWithFeedback,RequestWithFeedback and make image dialogue use it too
 * TODO: [🧠][👨‍⚕️] The problem with feedback returned together with answer is that when user cancels the dialogue, the feedback is not recorded
 */
