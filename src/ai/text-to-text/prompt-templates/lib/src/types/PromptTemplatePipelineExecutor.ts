import { PromptTemplateParams } from './PromptTemplateParams';

export interface PromptTemplatePipelineExecutor {
    (initialParams: PromptTemplateParams): Promise<PromptTemplateParams>;
}
