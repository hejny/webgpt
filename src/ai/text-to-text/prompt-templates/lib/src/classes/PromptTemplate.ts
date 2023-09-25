import { string_prompt, string_template } from '../../../../../../utils/typeAliases';
import { ModelRequirements, ModelVariant } from '../types/ModelRequirements';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { replaceParams } from '../utils/replaceParams';
import { Prompt } from './Prompt';

export class PromptTemplate<TEntryParams extends PromptTemplateParams, TResultParams extends PromptTemplateParams> {
    public constructor(
        private readonly source: string_prompt & string_template /* <- TODO: Just one helper type */,
        private readonly modelRequirements: ModelRequirements,
    ) {}

    writePrompt(params: PromptTemplateParams): Prompt {
        let prompt = replaceParams(this.source, params);
        return new Prompt(prompt, this.modelRequirements);
    }
}
