import type { message } from '../../../utils/typeAliases';

export interface PromptDialogOptions {
    /**
     * Prompt message
     *
     * Note: This is not a prompt to language model but a prompt to the user
     */
    prompt: message;

    /**
     * Default value for the input/textarea
     */
    defaultValue: string | null;

    /**
     * Placeholder for the input/textarea
     */
    placeholder?: string;

    /**
     * If true, the prompt can be closed by the user
     * When the prompt is closed, the answer is `null`
     */
    isCloseable: boolean;

    /**
     * If set, the prompt will be automatically submitted after the given number of milliseconds
     */
    autoSubmit?: number;
}
