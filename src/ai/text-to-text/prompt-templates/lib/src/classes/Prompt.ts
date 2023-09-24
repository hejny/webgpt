import { string_prompt } from '../../../../../../utils/typeAliases';
import { ModelRequirements, ModelVariant } from '../types/ModelRequirements';

export class Prompt<TPromptingVariant extends ModelVariant> {
    public constructor(public readonly prompt: string_prompt, public readonly modelRequirements: ModelRequirements) {}

    public toString(): string_prompt {
        return this.prompt;
    }
}

/**
 * TODO: [🧠] !! Probbably remove TPromptingVariant and check ModelRequirements only in runtime
 * TODO: Maybe DO interface from this
 */
