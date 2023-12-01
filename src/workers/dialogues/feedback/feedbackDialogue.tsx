import { makeDialogueFunction } from '../../lib/dialogues/makeDialogueFunction';
import { FeedbackDialogueComponent } from './component/FeedbackDialogueComponent';
import type { FeedbackDialogueRequest } from './types/FeedbackDialogueRequest';
import type { FeedbackDialogueResponse } from './types/FeedbackDialogueResponse';

/**
 * Feedback dialogue offers a simple feedback form to the user.
 */
export const feedbackDialogue = makeDialogueFunction<FeedbackDialogueRequest, FeedbackDialogueResponse>(
    FeedbackDialogueComponent,
);
