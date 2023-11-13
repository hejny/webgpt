import { makeDialogueFunction } from '../../lib/dialogues/makeDialogueFunction';
import { ConfirmDialogueComponent } from './component/ConfirmDialogueComponent';
import { ConfirmDialogueRequest } from './interfaces/ConfirmDialogueRequest';
import { ConfirmDialogueResponse } from './interfaces/ConfirmDialogueResponse';

/**
 * !!!
 */
export const confirmDialogue = makeDialogueFunction<ConfirmDialogueRequest, ConfirmDialogueResponse>(
    ConfirmDialogueComponent,
);