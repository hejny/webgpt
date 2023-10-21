import { string_prompt, string_template } from '../../../../../../utils/typeAliases';
import { ModelRequirements } from '../types/ModelRequirements';
import { Prompt } from '../types/Prompt';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { replaceParams } from '../utils/replaceParams';

/**
 * Similar concept to Prompt, but with templating logic.
 *
 * @see https://github.com/hejny/ptp#prompt-template
 */
export class PromptTemplate<TInputParams extends PromptTemplateParams, TOutputParams extends PromptTemplateParams> {
    public constructor(
        // TODO: [🧠] Maybe> private readonly inputParameters: Set<PromptTemplatePipelineJsonParameter | { isInput: true }>,
        // TODO: [🧠] Maybe> private readonly outputParameters: Set<PromptTemplatePipelineJsonParameter | { isInput: false }>,
        private readonly content: string_prompt & string_template /* <- TODO: Just one helper type */,
        public readonly modelRequirements: ModelRequirements,
    ) {}

    /**
     * Writes prompt from template and params
     *
     * @param params params to fill the template
     * @returns prompt
     */
    public writePrompt(params: PromptTemplateParams): Prompt {
        return {
            ptpUrl: '!!!',
            parameters: params,
            content: replaceParams(this.content, params),
            modelRequirements: this.modelRequirements,
        };
    }
}

/**
 * TODO: !!! ACRY rename params to parameters
 */
