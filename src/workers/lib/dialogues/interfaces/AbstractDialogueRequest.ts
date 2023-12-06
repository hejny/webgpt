import { TransferableObject } from '../../interfaces/TransferableObject';

/**
 * Abstract request for any dialogue
 */
export type AbstractDialogueRequest = TransferableObject & {
    /**
     * The priority of the dialogue.
     * If there are multiple dialogues in the queue, the one with the highest priority will be shown first.
     * If there will be new dialogues added to the queue, the one with the highest priority will be popped on top in UI.
     *
     * @default 0
     */
    readonly priority?: number;
};
