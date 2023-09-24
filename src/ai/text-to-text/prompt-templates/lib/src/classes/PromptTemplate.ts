import { string_prompt, string_template } from '../../../../../../utils/typeAliases';
import { PromptingVariant } from '../types/PromptingVariant';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { Prompt } from './Prompt';

export class PromptTemplate<TPromptingVariant extends PromptingVariant> {
    public constructor(
        private readonly templateContent: string_prompt & string_template /* <- TODO: Just one helper type */,
        private readonly type: TPromptingVariant,
    ) {}

    makePrompt(params: PromptTemplateParams): Prompt<TPromptingVariant> {
        return new Prompt(this, params);
    }
}

/**
 * TODO: [➿] Refactor circular dependency between PromptTemplate and Prompt
 */
