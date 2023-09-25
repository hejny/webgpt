import { PromptTemplateParams } from './PromptTemplateParams';

export interface PromptTemplatePipelineExecutor<
    TEntryParams extends PromptTemplateParams,
    TResultParams extends PromptTemplateParams,
> {
    (entryParams: TEntryParams): Promise<TResultParams>;
}
