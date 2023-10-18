import { string_model_name } from '../../../../../../utils/typeAliases';

/**
 * Prompt result is the simplest concept of execution.
 * It is the result of executing one prompt _(NOT a template)_.
 *
 * @see https://github.com/hejny/ptp#prompt-result
 */
export type PromptResult = PromptCompletionResult | PromptChatResult;

/**
 * Prompt completion result
 * It contains only the following text NOT the whole completion
 */
export type PromptCompletionResult = PromptCommonResult;

/**
 * Prompt chat result
 */
export interface PromptChatResult extends PromptCommonResult {
    // TODO: [🤹‍♂️][🧠] Figure out way how to pass thread / previous messages
}

export interface PromptCommonResult {
    /**
     * Exact text response from the model.
     */
    readonly response: string;

    /**
     * Name of the model used to generate the response.
     */
    readonly model: string_model_name;
}

/**
 * TODO: [🧠] Add more execution stats like: tokens, spent, time, etc.
 *            + wrap in subobject stats
 */
