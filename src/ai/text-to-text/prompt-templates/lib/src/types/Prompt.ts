import { string_prompt, string_ptp_url } from '../../../../../../utils/typeAliases';
import { ModelRequirements } from './ModelRequirements';
import { PromptTemplateParams } from './PromptTemplateParams';

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

    
     readonly ptpUrl: string_ptp_url;

     //redundant
     readonly parameters: PromptTemplateParams;


}

/**
 * TODO: [✔] Check ModelRequirements in runtime
 */
