import { Promisable } from 'type-fest';
import { TaskProgress } from '../../../../../../components/TaskInProgress/task/TaskProgress';
import { PromptTemplateParams } from '../types/PromptTemplateParams';

/**
 * Executor is a simple async function that takes input params and returns result params _(along with all intermediate params and input params = it extends input object)_.
 * Executor is made by combining execution tools and prompt template pipeline library.
 *
 * It can be done in two ways:
 * -   From `PromptTemplatePipelineLibrary.getExecutor` method
 * -   `createPtpExecutor` utility function
 *
 * @see https://github.com/webgptorg/ptp#executor
 */
export interface PtpExecutor<TInputParams extends PromptTemplateParams, TOutputParams extends PromptTemplateParams> {
    (inputParams: TInputParams, onProgress: (taskProgress: TaskProgress) => Promisable<void>): Promise<TOutputParams>;
}

/**
 * TODO: [🧠] Should this file be in /execution or /types folder?
 */
