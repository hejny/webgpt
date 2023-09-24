import { PromptTemplateParams } from './PromptTemplateParams';

export interface PromptTemplatePipelineExecutor {
    (entryParams: PromptTemplateParams): Promise<PromptTemplateParams>;
}
