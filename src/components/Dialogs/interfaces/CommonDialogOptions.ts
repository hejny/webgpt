import type { message } from '../../../utils/typeAliases';

export interface CommonDialogOptions {
    /**
     * Title of the modal
     */
    title: message;

    /**
     * Message in the modal
     */
    message: message | null;

    /**
     * Default value for the input/textarea
     */
    defaultValue: string | null;

    /**
     * Placeholder for the input/textarea
     */
    placeholder: string | null;

    /**
     * If true, the modal can be closed by the user
     * Note: When the prompt is closed, the answer is `null`
     */
    isCloseable: boolean;

    /**
     * If set, the prompt will be automatically submitted after the given number of milliseconds
     */
    autoSubmit?: number;
}

/**
 * TODO: !!! validate
 * TODO: !!! multipleOptions
 * TODO: !!! isMultiline OR type
 */
