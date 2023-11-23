import { message } from '../../../../utils/typeAliases';

export interface ConfirmDialogueRequest {
    /**
     * Confirm message
     * What is being confirmed?
     *
     * @example "Are you sure you want to delete the image?"
     */
    readonly message: message;
}

/**
 * TODO: !!! Annotate
 */
