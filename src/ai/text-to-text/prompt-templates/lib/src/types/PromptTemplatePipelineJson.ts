import { string_prompt, string_template } from '../../../../../../utils/typeAliases';
import { ModelRequirements } from './ModelRequirements';

/**
 *
 * TODO: !! Copy to all 3
 *
 * Note: Theese 3 are representing same thing, but in different forms
 *     - `PromptTemplatePipelineString` !!
 *     - `PromptTemplatePipelineJson` !!
 *     - `PromptTemplatePipeline` !!
 */
export interface PromptTemplatePipelineJson {
    promptTemplates: Array<{
        modelRequirements: ModelRequirements;
        promptTemplate: string_prompt & string_template /* <- TODO: Just one helper type */;
        resultingParamName: string;
    }>;
}

/**
 * TODO: [🧠] Best format of this code?
 *             There must be possible to make
 *             - Branching
 *             - Loops
 *             - Paralelization
 *             - ...and more
 * TODO: This is a cornerstone of .promptTemplatePipeline.json file
 */
