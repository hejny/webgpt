import { string_prompt } from '../../../../../../utils/typeAliases';
import { ModelRequirements } from './ModelRequirements';

export interface Prompt {
    readonly request: string_prompt;
    readonly modelRequirements: ModelRequirements;
}

/**
 * TODO: [✔] Check ModelRequirements in runtime
 * TODO: Maybe DO interface from this
 */
