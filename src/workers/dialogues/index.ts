import { DialogueFunction } from '../lib/dialogues/interfaces/DialogueFunction';
import { simpleTextDialogue } from './simple-text/simpleTextDialogue';

/**
 * All dialogues that are used in WebGPT app
 *
 * @singleton
 */
export const supportDialogues: Array<DialogueFunction<any, any>> = [simpleTextDialogue];
