import { message } from '../../../../utils/typeAliases';

export type ConfirmDialogueRequest = {
    /**
     * Confirm message
     * What is being confirmed?
     *
     * @example "Are you sure you want to delete the image?"
     */
    readonly message: message;
};
