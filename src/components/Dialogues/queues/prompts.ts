import type { PromptInQueue } from '../interfaces/PromptInQueue';

/**
 * Queue of prompt dialogues that are waiting for an answer
 *
 * @private this should be used only withing this folder Dialogues
 */
export const promptDialogueQueue: Array<PromptInQueue> = [];
