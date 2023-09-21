import spaceTrim from 'spacetrim';
import { string_prompt, string_template } from '../../../../../utils/typeAliases';
import { PromptTemplate } from './PromptTemplate';




export class PromptTemplatePipeline {
    public constructor(public readonly promptTemplates: PromptTemplate<any>) {}

    makePrompt(params: PromptTemplateParams): Prompt<TType> {
        return new Prompt(this, params);
    }
}

