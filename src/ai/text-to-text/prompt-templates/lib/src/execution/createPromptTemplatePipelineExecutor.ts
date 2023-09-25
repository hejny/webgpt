import { PromptTemplate } from '../classes/PromptTemplate';
import { PromptTemplatePipeline } from '../classes/PromptTemplatePipeline';
import { PromptingExecutionTools } from '../types/PromptingExecutionTools';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PromptTemplatePipelineExecutor } from '../types/PromptTemplatePipelineExecutor';

interface CreatePromptTemplatePipelineExecutorOptions<
    TEntryParams extends PromptTemplateParams,
    TResultParams extends PromptTemplateParams,
> {
    promptTemplatePipeline: PromptTemplatePipeline<TEntryParams, TResultParams>;
    tools: PromptingExecutionTools;
}

export function createPromptTemplatePipelineExecutor<
    TEntryParams extends PromptTemplateParams,
    TResultParams extends PromptTemplateParams,
>(
    options: CreatePromptTemplatePipelineExecutorOptions<TEntryParams, TResultParams>,
): PromptTemplatePipelineExecutor<TEntryParams, TResultParams> {
    const {
        promptTemplatePipeline,
        tools: {
            gpt: { createChatThread /* TODO: [⛱]> completeWithGpt */ },
        },
    } = options;

    const promptTemplatePipelineExecutor = async (entryParams: TEntryParams) => {
        let paramsToPass: PromptTemplateParams = entryParams;
        let currentPromptTemplate: PromptTemplate<PromptTemplateParams, PromptTemplateParams> | null =
            promptTemplatePipeline.entryPromptTemplate;

        while (currentPromptTemplate !== null) {
            const resultingParamName = promptTemplatePipeline.getResultingParamName(currentPromptTemplate!);
            const prompt = currentPromptTemplate.writePrompt(paramsToPass);

            const chatThread = await createChatThread(prompt);

            paramsToPass = {
                ...paramsToPass,
                [resultingParamName]: chatThread.response /* <- TODO: Detect param collision here */,
            };

            currentPromptTemplate = promptTemplatePipeline.getFollowingPromptTemplate(currentPromptTemplate!);
        }

        // TODO:             <- We are assigning TResultParams to TResultParams, but we are not sure if it's correct, maybe check in runtime
        return paramsToPass as TResultParams;
    };

    return promptTemplatePipelineExecutor;
}

/**
 * TODO: !!! Implement
 * Note: CreatePromptTemplatePipelineExecutorOptions are just connected to PromptTemplatePipelineExecutor so do not extract to types folder
 */
