import { message } from '../../../../utils/typeAliases';

export type FeedbackDialogueRequest = {
    /**
     * Feedback message
     * Sentence about is being feedbacked?
     *
     * @example "Give us feedback about the proposed title"
     */
    readonly message: message;

    /**
     * The subject of the feedback
     * What is being feedbacked?
     *
     * @example "proposed title"
     */
    readonly subject: string;

    /**
     * Default value for the note
     */
    readonly defaultValue: string | null;

    /**
     * Placeholder for the note
     */
    readonly placeholder?: string;
};

/**
 * Note: [🤽‍♀️]
 */
