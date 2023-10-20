import { string_prompt } from '../../../../../../utils/typeAliases';
import { ModelRequirements } from './ModelRequirements';

/**
 * Prompt in a text along with model requirements, but without any execution or templating logic.
 *
 * @see https://github.com/hejny/ptp#prompt
 */
export interface Prompt {
    /**
     * The text of the prompt
     *
     * Note: This is not a template, this is exactly the text that will be sent to the model
     * @example "What is the capital of France?"
     */
    readonly content: string_prompt;

    /**
     * Requirements for the model
     */
    readonly modelRequirements: ModelRequirements;
}

/**
 * TODO: [✔] Check ModelRequirements in runtime
 */
