import { string_prompt, string_template } from '../../../../../../utils/typeAliases';
import { PromptingVariant } from '../types/PromptingVariant';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { Prompt } from './Prompt';

export class PromptTemplate<TPromptingVariant extends PromptingVariant> {
    public constructor(
        private readonly source: string_prompt & string_template /* <- TODO: Just one helper type */,
        private readonly type: TPromptingVariant,
    ) {}

    makePrompt(params: PromptTemplateParams): Prompt<TPromptingVariant> {
        let prompt = this.source;

        /* prompt = spaceTrim(prompt);
        // TODO: !!! Replace all params
        // TODO: !!! Remove comments
        return prompt;
        */

        return new Prompt(prompt, this.type);
    }
}

/**
 * TODO: Maybe DO interface from this
 */
