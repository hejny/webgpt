import type { message } from '../../../../utils/typeAliases';
import type { AbstractDialogueRequest } from '../../../lib/dialogues/interfaces/AbstractDialogueRequest';

export type ConfirmDialogueRequest = AbstractDialogueRequest & {
    /**
     * Confirm message
     * What is being confirmed?
     *
     * @example "Are you sure you want to delete the image?"
     */
    readonly message: message;
};
