import { PromptTemplate } from '../classes/PromptTemplate';
import { PromptTemplatePipeline } from '../classes/PromptTemplatePipeline';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PtpExecutionTools } from '../types/PtpExecutionTools';
import { PtpExecutor } from '../types/PtpExecutor';

interface CreatePtpExecutorOptions<
    TEntryParams extends PromptTemplateParams,
    TResultParams extends PromptTemplateParams,
> {
    ptp: PromptTemplatePipeline<TEntryParams, TResultParams>;
    tools: PtpExecutionTools;
}

export function createPtpExecutor<
    TEntryParams extends PromptTemplateParams,
    TResultParams extends PromptTemplateParams,
>(options: CreatePtpExecutorOptions<TEntryParams, TResultParams>): PtpExecutor<TEntryParams, TResultParams> {
    const {
        ptp,
        tools: {
            gpt: { createChatThread, completeWithGpt },
        },
    } = options;

    const ptpExecutor = async (entryParams: TEntryParams) => {
        let paramsToPass: PromptTemplateParams = entryParams;
        let currentPtp: PromptTemplate<PromptTemplateParams, PromptTemplateParams> | null = ptp.entryPromptTemplate;

        while (currentPtp !== null) {
            const resultingParamName = ptp.getResultingParamName(currentPtp!);
            const prompt = currentPtp.writePrompt(paramsToPass);

            let response: string;
            if (currentPtp.modelRequirements.variant === 'CHAT') {
                const chatThread = await createChatThread(prompt);
                response = chatThread.response;
            } else if (currentPtp.modelRequirements.variant === 'COMPLETION') {
                const completionResult = await completeWithGpt(prompt);
                response = completionResult.response;
            } else {
                throw new Error(`Unknown model variant: ${currentPtp.modelRequirements.variant}`);
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
 * TODO: !!! Do not export from library, make in private within the PTP library
 * TODO: !!! Implement
 * Note: CreatePtpExecutorOptions are just connected to PtpExecutor so do not extract to types folder
 */
