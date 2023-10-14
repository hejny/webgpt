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
        private readonly source: string_prompt & string_template /* <- TODO: Just one helper type */,
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
            request: replaceParams(this.source, params),
            modelRequirements: this.modelRequirements,
        };
    }
}
