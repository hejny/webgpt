import { DialogueRequestInQueue } from './interfaces/DialogueRequestInQueue';

/**
 * Queue of dialogues that are waiting for an response
 *
 * @private Use only withing the folder Dialogues
 */
export const dialoguesQueue: Array<DialogueRequestInQueue> = [];

/**
 * TODO: !! Make some better (not any or object) type for dialogue request+response
 */
