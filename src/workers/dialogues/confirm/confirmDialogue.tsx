import { makeDialogueFunction } from '../../lib/dialogues/makeDialogueFunction';
import { ConfirmDialogueComponent } from './component/ConfirmDialogueComponent';
import type { ConfirmDialogueRequest } from './types/ConfirmDialogueRequest';
import type { ConfirmDialogueResponse } from './types/ConfirmDialogueResponse';

/**
 * Confirm dialogue offers a simple yes/no question to the user.
 */
export const confirmDialogue = makeDialogueFunction<ConfirmDialogueRequest, ConfirmDialogueResponse>(
    ConfirmDialogueComponent,
);
