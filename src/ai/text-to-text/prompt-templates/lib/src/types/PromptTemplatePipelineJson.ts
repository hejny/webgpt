import { string_prompt, string_template } from '../../../../../../utils/typeAliases';
import { PromptingVariant } from './PromptingVariant';

/**
 *
 * !!! Make branded type PromptTemplatePipelineString
 * !!! Copy to all 3
 * Note: Theese 3 are representing same thing, but in different forms
 *     - `PromptTemplatePipelineString` !!!
 *     - `PromptTemplatePipelineJson` !!!
 *     - `PromptTemplatePipeline` !!!
 */
export interface PromptTemplatePipelineJson {
    promptTemplates: Array<{
        type: PromptingVariant;
        promptTemplate: string_prompt & string_template /* <- TODO: Just one helper type */;
        resultingParamName: string;
    }>;
}

/**
 * TODO: This is a cornerstone of .promptTemplatePipeline.json file
 */
