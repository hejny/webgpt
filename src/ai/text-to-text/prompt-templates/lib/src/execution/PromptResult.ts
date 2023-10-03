import { string_model_name } from '../../../../../../utils/typeAliases';

/**
 * Prompt result is the simplest concept of execution.
 * It is the result of executing one prompt _(NOT a template)_.
 *
 * @see https://github.com/hejny/ptp#prompt-result
 */
export interface PromptResult {
    /**
     * Exact text response from the model.
     */
    readonly response: string;
    readonly model: string_model_name;
}

export interface PromptChatResult extends PromptResult {
    // TODO: [🤹‍♂️][🧠] Figure out way how to pass thread / previous messages
}

/**
 * TODO: [🧠] Add more execution stats like: tokens, spent, time, etc.
 *            + wrap in subobject stats
 * TODO: !!! ACRY add public / private /... to all methods
 */
