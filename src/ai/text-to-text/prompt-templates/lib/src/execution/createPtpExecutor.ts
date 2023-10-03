import { Promisable } from 'type-fest';
import { TaskProgress } from '../../../../../../components/TaskInProgress/task/TaskProgress';
import { PromptTemplate } from '../classes/PromptTemplate';
import { PromptTemplatePipeline } from '../classes/PromptTemplatePipeline';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PtpExecutionTools } from './PtpExecutionTools';
import { PtpExecutor } from './PtpExecutor';

interface CreatePtpExecutorOptions<
    TEntryParams extends PromptTemplateParams,
    TResultParams extends PromptTemplateParams,
> {
    readonly ptp: PromptTemplatePipeline<TEntryParams, TResultParams>;
    readonly tools: PtpExecutionTools;
}

/**
 * Creates executor function from prompt template pipeline and execution tools.
 *
 * Note: Consider using getExecutor method of the library instead of using this function
 */
export function createPtpExecutor<
    TEntryParams extends PromptTemplateParams,
    TResultParams extends PromptTemplateParams,
>(options: CreatePtpExecutorOptions<TEntryParams, TResultParams>): PtpExecutor<TEntryParams, TResultParams> {
    const { ptp, tools } = options;

    const ptpExecutor = async (
        entryParams: TEntryParams,
        onProgress?: (taskProgress: TaskProgress) => Promisable<void>,
    ) => {
        let paramsToPass: PromptTemplateParams = entryParams;
        let currentPtp: PromptTemplate<PromptTemplateParams, PromptTemplateParams> | null = ptp.entryPromptTemplate;

        while (currentPtp !== null) {
            const resultingParamName = ptp.getResultingParamName(currentPtp!);

            if (onProgress) {
                await onProgress({
                    name: `ptp-executor-frame-${resultingParamName}`,
                    title: `Copywriting ${
                        resultingParamName /* <- TODO: !!! Use real title + make looking good together with other tasks on new screen */
                    }`,
                    isDone: false,
                });
            }

            const prompt = currentPtp.writePrompt(paramsToPass);

            let response: string;
            if (currentPtp.modelRequirements.variant === 'CHAT') {
                const chatThread = await tools.gptChat(prompt);
                // TODO: [🍬] Destroy chatThread

                response = chatThread.response;
            } else if (currentPtp.modelRequirements.variant === 'COMPLETION') {
                throw new Error(`Not implemented`);
                // const completionResult = await tools.gptComplete(prompt);
                // response = completionResult.response;
            } else {
                throw new Error(`Unknown model variant: ${currentPtp.modelRequirements.variant}`);
            }

            if (onProgress) {
                onProgress({
                    name: `ptp-executor-frame-${resultingParamName}`,
                    isDone: true,
                });
            }

            paramsToPass = {
                ...paramsToPass,
                [resultingParamName]: response /* <- TODO: Detect param collision here */,
            };

            currentPtp = ptp.getFollowingPromptTemplate(currentPtp!);
        }

        // TODO:             <- We are assigning TResultParams to TResultParams, but we are not sure if it's correct, maybe check in runtime
        return paramsToPass as TResultParams;
    };

    return ptpExecutor;
}

/**
 * Note: CreatePtpExecutorOptions are just connected to PtpExecutor so do not extract to types folder
 */
