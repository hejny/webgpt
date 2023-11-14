import { makeDialogueFunction } from '../../lib/dialogues/makeDialogueFunction';
import { SimpleTextDialogueComponent } from './component/SimpleTextDialogueComponent';
import { SimpleTextDialogueRequest } from './interfaces/SimpleTextDialogueRequest';
import { SimpleTextDialogueResponse } from './interfaces/SimpleTextDialogueResponse';

/**
 * !!! Annotate
 */
export const simpleTextDialogue = makeDialogueFunction<SimpleTextDialogueRequest, SimpleTextDialogueResponse>(
    SimpleTextDialogueComponent,
);
