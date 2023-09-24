import { string_prompt, string_template } from '../../../../../../utils/typeAliases';
import { ModelRequirements, ModelVariant } from '../types/ModelRequirements';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { Prompt } from './Prompt';

export class PromptTemplate<TPromptingVariant extends ModelVariant> {
    public constructor(
        private readonly source: string_prompt & string_template /* <- TODO: Just one helper type */,
        private readonly modelRequirements: ModelRequirements,
    ) {}

    makePrompt(params: PromptTemplateParams): Prompt<TPromptingVariant> {
        let prompt = this.source;

        /* prompt = spaceTrim(prompt);
        // TODO: !!! Replace all params
        // TODO: !!! Remove comments
        return prompt;
        */

        return new Prompt(prompt, this.modelRequirements);
    }
}
