import { string_prompt } from '../../../../../../utils/typeAliases';
import { PromptingVariant } from '../types/PromptingVariant';

export class Prompt<TPromptingVariant extends PromptingVariant> {
    public constructor(public readonly prompt: string_prompt, public readonly type: TPromptingVariant) {}
}

/**
 * TODO: Maybe DO interface from this
 */
