import { Promisable } from 'type-fest';
import { TaskProgress } from '../../../../../../components/TaskInProgress/task/TaskProgress';
import { PromptTemplate } from '../classes/PromptTemplate';
import { PromptTemplatePipeline } from '../classes/PromptTemplatePipeline';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PtpExecutionTools } from './PtpExecutionTools';
import { PtpExecutor } from './PtpExecutor';

interface CreatePtpExecutorOptions<
    TInputParams extends PromptTemplateParams,
    TOutputParams extends PromptTemplateParams,
> {
    readonly ptp: PromptTemplatePipeline<TInputParams, TOutputParams>;
    readonly tools: PtpExecutionTools;
}

/**
 * Creates executor function from prompt template pipeline and execution tools.
 *
 * Note: Consider using getExecutor method of the library instead of using this function
 */
export function createPtpExecutor<
    TInputParams extends PromptTemplateParams,
    TOutputParams extends PromptTemplateParams,
>(options: CreatePtpExecutorOptions<TInputParams, TOutputParams>): PtpExecutor<TInputParams, TOutputParams> {
    const { ptp, tools } = options;

    const ptpExecutor = async (
        inputParams: TInputParams,
        onProgress?: (taskProgress: TaskProgress) => Promisable<void>,
    ) => {
        let paramsToPass: PromptTemplateParams = inputParams;
        let currentPtp: PromptTemplate<PromptTemplateParams, PromptTemplateParams> | null = ptp.entryPromptTemplate;

        while (currentPtp !== null) {
            const { name, description } = ptp.getResultingParameter(currentPtp!);

            if (onProgress) {
                await onProgress({
                    name: `ptp-executor-frame-${name}`,
                    title: `🖋 ${description}`,
                    isDone: false,
                });
            }

            const prompt = currentPtp.writePrompt(paramsToPass);

            let resultContent: string;

            // TODO: !!! Use here also execution type

            // TODO: !!! ACRY Maybe use switch instead of if in all CHAT vs COMPLETION cases
            if (currentPtp.modelRequirements.variant === 'CHAT') {
                const chatThread = await tools.gptChat(prompt);
                // TODO: Use all information from chatThread like "model"
                // TODO: [🍬] Destroy chatThread
                resultContent = chatThread.content;
            } else if (currentPtp.modelRequirements.variant === 'COMPLETION') {
                const completionResult = await tools.gptComplete(prompt);
                // TODO: Use all information from chatThread like "model"
                resultContent = completionResult.content;
            } else {
                throw new Error(`Unknown model variant "${currentPtp.modelRequirements.variant}"`);
            }

            if (onProgress) {
                onProgress({
                    name: `ptp-executor-frame-${name}`,
                    isDone: true,
                });
            }

            paramsToPass = {
                ...paramsToPass,
                [name]: resultContent /* <- TODO: Detect parameter collision here */,
            };

            currentPtp = ptp.getFollowingPromptTemplate(currentPtp!);
        }

        // TODO:             <- We are assigning TOutputParams to TOutputParams, but we are not sure if it's correct, maybe check in runtime
        return paramsToPass as TOutputParams;
    };

    return ptpExecutor;
}

/**
 * Note: CreatePtpExecutorOptions are just connected to PtpExecutor so do not extract to types folder
 */
