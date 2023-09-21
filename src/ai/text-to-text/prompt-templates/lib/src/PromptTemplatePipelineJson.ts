import { PromptTemplate } from './PromptTemplate';

export interface PromptTemplatePipelineJson {
    promptTemplates: Array<{ promptTemplate: PromptTemplate<any>; resultingParamName: string }>;
}

/**
 * TODO: This is a cornerstone of .ptp.json file
 */
