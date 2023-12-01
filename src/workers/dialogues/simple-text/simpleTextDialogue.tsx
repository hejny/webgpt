import { makeDialogueFunction } from '../../lib/dialogues/makeDialogueFunction';
import { SimpleTextDialogueComponent } from './component/SimpleTextDialogueComponent';
import type { SimpleTextDialogueRequest } from './interfaces/SimpleTextDialogueRequest';
import type { SimpleTextDialogueResponse } from './interfaces/SimpleTextDialogueResponse';

/**
 * Simple text dialogue offers a modal to the user to enter a (multiline) text.
 */
export const simpleTextDialogue = makeDialogueFunction<SimpleTextDialogueRequest, SimpleTextDialogueResponse>(
    SimpleTextDialogueComponent,
);
