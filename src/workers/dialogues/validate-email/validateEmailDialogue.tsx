import { makeDialogueFunction } from '../../lib/dialogues/makeDialogueFunction';
import { ValidateEmailDialogueComponent } from './component/ValidateEmailDialogueComponent';
import type { ValidateEmailDialogueRequest } from './types/ValidateEmailDialogueRequest';
import type { ValidateEmailDialogueResponse } from './types/ValidateEmailDialogueResponse';

/**
 * Simple text dialogue offers a modal to the user to enter a (multiline) text.
 */
export const validateEmailDialogue = makeDialogueFunction<ValidateEmailDialogueRequest, ValidateEmailDialogueResponse>(
    ValidateEmailDialogueComponent,
);

/**
 * TODO: [🧠][👨‍⚕️] The problem with feedback returned together with answer is that when user cancels the dialogue, the feedback is not recorded
 */
