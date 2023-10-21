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

            // TODO: !!! Use here also execution type
            let promptResult: string;
            switch (currentPtp.modelRequirements.variant) {
                case 'CHAT':
                    const chatThread = await tools.gptChat(prompt);
                    // TODO: Use all information from chatThread like "model"
                    // TODO: [🍬] Destroy chatThread
                    promptResult = chatThread.content;
                    break;
                case 'COMPLETION':
                    const completionResult = await tools.gptComplete(prompt);
                    // TODO: Use all information from chatThread like "model"
                    promptResult = completionResult.content;
                    break;
                default:
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
                [name]: promptResult /* <- Note: Not need to detect parameter collision here because PromptTemplatePipeline checks logic consistency during construction */,
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
