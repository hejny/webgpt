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


/**
 * TODO: [🧠][👨‍⚕️] The problem with feedback returned together with answer is that when user cancels the dialogue, the feedback is not recorded
 */