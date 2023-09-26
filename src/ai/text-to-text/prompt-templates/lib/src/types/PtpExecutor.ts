import { Promisable } from 'type-fest';
import { TaskProgress } from '../../../../../../components/TaskInProgress/task/TaskProgress';
import { PromptTemplateParams } from './PromptTemplateParams';

export interface PtpExecutor<TEntryParams extends PromptTemplateParams, TResultParams extends PromptTemplateParams> {
    (entryParams: TEntryParams, onProgress: (taskProgress: TaskProgress) => Promisable<void>): Promise<TResultParams>;
}
