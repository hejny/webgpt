import type { message } from '../../../../utils/typeAliases';
import { AbstractDialogueRequest } from '../../../lib/dialogues/interfaces/AbstractDialogueRequest';

export type SimpleTextDialogueRequest = AbstractDialogueRequest & {
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

    /**
     * Whether the feedback  button is shown
     *
     * Note: This does not mean that user must give feedback it just means that user can give feedback
     */
    readonly isFeedbackCollected: boolean;
};

/**
 * TODO: isMultiline
 * TODO: isRequired
 */
