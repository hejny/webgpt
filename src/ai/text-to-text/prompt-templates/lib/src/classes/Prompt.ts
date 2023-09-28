import { string_prompt } from '../../../../../../utils/typeAliases';
import { ModelRequirements } from '../types/ModelRequirements';

export class Prompt {
    public constructor(public readonly request: string_prompt, public readonly modelRequirements: ModelRequirements) {}

    public toString(): string_prompt {
        return this.request;
    }
}

/**
 * TODO: !!! Change this to interface | replace ACRY all prompt.toString - use destructuring
 * TODO: [✔] Check ModelRequirements in runtime
 * TODO: Maybe DO interface from this
 */
