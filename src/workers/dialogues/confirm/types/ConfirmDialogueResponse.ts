import type { AbstractDialogueResponse } from "../../../lib/dialogues/interfaces/AbstractDialogueResponse";

export type ConfirmDialogueResponse = AbstractDialogueResponse & {
    /**
     * result of the confirmation
     */
    readonly answer: boolean;
}
