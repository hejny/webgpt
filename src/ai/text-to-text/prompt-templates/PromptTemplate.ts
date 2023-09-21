import spaceTrim from 'spacetrim';
import { string_prompt, string_template } from '../../../utils/typeAliases';

/**
 *
 */
type PromptTemplateParams = Record<string, string | null>;

/**
 * !!! Annotate all +
 */
export class PromptTemplate<TType extends 'COMPLETION' | 'CHAT'> {
    public constructor(public readonly templateContent: string_prompt & string_template) {}

    makePrompt(params: PromptTemplateParams): Prompt<TType> {
        return new Prompt(this, params);
    }
}

/**
 * !!! Annotate all +
 */
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

/**
 * TODO: !!! Model requirements like modelName
 * TODO: !!! Model requirements like COMPLETION vs CHAT + ACRY DRY
 * TODO: !!! template version
 * TODO: !!! template language
 * TODO: !!! Log the template
 */
