import { string_prompt, string_template } from '../../../../../utils/typeAliases';
import { Prompt } from './Prompt';
import { PromptingVariant } from './PromptingVariant';
import { PromptTemplateParams } from './PromptTemplateParams';

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
