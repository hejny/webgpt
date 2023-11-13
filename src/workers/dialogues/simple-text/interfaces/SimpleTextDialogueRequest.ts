import { message } from '../../../../utils/typeAliases';

export interface SimpleTextDialogueRequest {
    /**
     * Prompt message
     */
    message: message;

    /**
     * Default value for the input/textarea
     */
    defaultValue: string | null;

    /**
     * Placeholder for the input/textarea
     */
    placeholder?: string;
}

/**
 * TODO: !!! Annotate + readonly
 * TODO: isMultiline
 * TODO: isRequired
 */
