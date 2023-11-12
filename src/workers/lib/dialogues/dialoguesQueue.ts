import { DialogueRequestInQueue } from './interfaces/DialogueRequestInQueue';

/**
 * !!! Update
 * Queue of prompt dialogues that are waiting for an answer
 *
 * @private Use only withing the folder Dialogues
 */
export const dialoguesQueue: Array<DialogueRequestInQueue> = [];

/**
 * TODO: !! Make some better (not any or object) type for dialogue request+response
 */
