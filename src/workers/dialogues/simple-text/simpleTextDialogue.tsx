import { makeDialogueFunction } from '../../lib/dialogues/makeDialogueFunction';
import { SimpleTextDialogueComponent } from './component/SimpleTextDialogueComponent';
import { SimpleTextDialogueRequest } from './interfaces/SimpleTextDialogueRequest';
import { SimpleTextDialogueResponse } from './interfaces/SimpleTextDialogueResponse';

/**
 * TODO: !!! Annotate
 */
export const simpleTextDialogue = makeDialogueFunction<SimpleTextDialogueRequest, SimpleTextDialogueResponse>(
    SimpleTextDialogueComponent,
);
