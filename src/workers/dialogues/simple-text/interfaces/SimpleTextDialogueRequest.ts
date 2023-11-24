import { message } from '../../../../utils/typeAliases';

export interface SimpleTextDialogueRequest {
    /**
     * Prompt message
     */
    readonly message: message;

    /**
     * Default value for the input/textarea
     */
    readonly defaultValue: string | null;

    /**
     * Placeholder for the input/textarea
     */
    readonly placeholder?: string;
}

/**
 * TODO: isMultiline
 * TODO: isRequired
 */
