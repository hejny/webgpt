import spaceTrim from 'spacetrim';
import { string_prompt } from '../../../../../utils/typeAliases';
import { PromptingVariant } from './PromptingVariant';
import { PromptTemplate } from './PromptTemplate';
import { PromptTemplateParams } from './PromptTemplateParams';

export class Prompt<TPromptingVariant extends PromptingVariant> {
    public constructor(
        private readonly template: PromptTemplate<TPromptingVariant>,
        private readonly params: PromptTemplateParams,
    ) {}

    toString(): string_prompt {
        let prompt = this.template.toString();
        prompt = spaceTrim(prompt);
        // TODO: !!! Replace all params
        // TODO: !!! Remove comments
        return prompt;
    }
}

/**
 * TODO: [➿] Refactor circular dependency between PromptTemplate and Prompt
 */
