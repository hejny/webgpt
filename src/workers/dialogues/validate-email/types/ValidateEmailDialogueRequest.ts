import { AbstractDialogueRequest } from '../../../lib/dialogues/interfaces/AbstractDialogueRequest';

export type ValidateEmailDialogueRequest = AbstractDialogueRequest & {
    /**
     * Is required to have verified email
     * - If `false`, just putting in the email will be enough
     * - If `true`, user will must verify the email
     */
    readonly isVerifiedEmailRequired: boolean;

    // Note: ValidateEmailDialogue is a special dialogue, it has no input
};
