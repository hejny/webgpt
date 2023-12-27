import type { DialogueFunction } from '../lib/dialogues/interfaces/DialogueFunction';
import { confirmDialogue } from './confirm/confirmDialogue';
import { feedbackDialogue } from './feedback/feedbackDialogue';
import { imageGeneratorDialogue } from './image-generator/imageGeneratorDialogue';
import { simpleTextDialogue } from './simple-text/simpleTextDialogue';

/**
 * All dialogues that are used in WebGPT app
 *
 * @singleton
 */
export const supportDialogues: Array<
    DialogueFunction<any, any /* <- TODO: AbstractDialogueRequest, AbstractDialogueResponse */>
> = [simpleTextDialogue, confirmDialogue, imageGeneratorDialogue, feedbackDialogue];
