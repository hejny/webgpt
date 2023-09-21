import spaceTrim from 'spacetrim';
import { string_prompt } from '../../../../../utils/typeAliases';
import { PromptTemplate } from './PromptTemplate';
import { PromptTemplateParams } from './PromptTemplateParams';

export class Prompt<TType extends 'COMPLETION' | 'CHAT'> {
    public constructor(public readonly template: PromptTemplate<TType>, public readonly params: PromptTemplateParams) {}

    toString(): string_prompt {
        let prompt = this.template.templateContent;
        prompt = spaceTrim(prompt);
        // TODO: !!! Replace all params
        // TODO: !!! Remove comments
        return prompt;
    }
}
