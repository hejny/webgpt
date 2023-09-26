import { PromptTemplateParams } from './PromptTemplateParams';

export interface PtpExecutor<TEntryParams extends PromptTemplateParams, TResultParams extends PromptTemplateParams> {
    (entryParams: TEntryParams): Promise<TResultParams>;
}
