import { string_prompt, string_template } from '../../../../../utils/typeAliases';
import { Prompt } from './Prompt';
import { PromptTemplateParams } from './PromptTemplateParams';

export class PromptTemplate<TType extends 'COMPLETION' | 'CHAT'> {
    public constructor(
        public readonly templateContent: string_prompt & string_template /* <- TODO: Just one helper type */,
    ) {}

    makePrompt(params: PromptTemplateParams): Prompt<TType> {
        return new Prompt(this, params);
    }
}
