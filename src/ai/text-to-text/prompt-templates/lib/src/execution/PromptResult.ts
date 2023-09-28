import { string_model_name } from '../../../../../../utils/typeAliases';

export interface PromptResult {
    readonly response: string;
    readonly model: string_model_name;
}

export interface PromptChatResult extends PromptResult {
    // TODO: [🤹‍♂️][🧠] Figure out way how to pass thread / previous messages
}

/**
 * TODO: [🧠] Add more execution stats like: tokens, spent, time, etc.
 *            + wrap in subobject stats
 * TODO: !!! ACRY add readonly to all properties
 * TODO: !!! ACRY add public / private /... to all methods
 */
