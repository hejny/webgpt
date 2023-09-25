import { string_prompt } from '../../../../../../utils/typeAliases';
import { ModelRequirements } from '../types/ModelRequirements';

export class Prompt {
    public constructor(public readonly prompt: string_prompt, public readonly modelRequirements: ModelRequirements) {}

    public toString(): string_prompt {
        return this.prompt;
    }
}

/**
 * TODO: [✔] Check ModelRequirements in runtime
 * TODO: Maybe DO interface from this
 */
