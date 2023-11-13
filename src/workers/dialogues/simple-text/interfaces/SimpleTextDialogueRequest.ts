import { message } from '../../../../utils/typeAliases';

export interface SimpleTextDialogueRequest {
    /**
     * Prompt message
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
}

/**
 * TODO: !!! Rename prompt -> message
 * TODO: !!! Annotate + readonly
 */
