import { string_prompt } from '../../../../../../utils/typeAliases';
import { ModelRequirements, ModelVariant } from '../types/ModelRequirements';

export class Prompt<TPromptingVariant extends ModelVariant> {
    public constructor(public readonly prompt: string_prompt, public readonly modelRequirements: ModelRequirements) {}
}

/**
 * TODO: Maybe DO interface from this
 */
