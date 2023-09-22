import { string_prompt, string_template } from '../../../../../utils/typeAliases';
import { PromptTemplate } from './PromptTemplate';

export interface PromptTemplatePipelineJson {
    promptTemplates: Array<{ promptTemplateContent:  string_prompt & string_template /* <- TODO: Just one helper type */; resultingParamName: string }>;
}

/**
 * TODO: This is a cornerstone of .ptp.json file
 */
