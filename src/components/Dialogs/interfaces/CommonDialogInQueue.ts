import { CommonDialogOptions } from './CommonDialogOptions';

/**
 * Represents a prompt message that is waiting for an answer or is already answered
 *
 * Note: This is not a prompt to language model but a prompt to the user
 * @private this should be used only withing this folder Dialogs
 */
export interface CommonDialogInQueue extends CommonDialogOptions {
    /**
     * Answer to the prompt
     *
     * - `undefined` means that the prompt is not answered yet and is waiting for an answer
     * - `null` means that the prompt is answered with `null`
     * - `string` means the answer to the prompt
     */
    answer: undefined | string | null;
}
