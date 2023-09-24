import { PromptTemplate } from '../classes/PromptTemplate';
import { PromptTemplatePipeline } from '../classes/PromptTemplatePipeline';
import { PromptingExecutionTools } from '../types/PromptingExecutionTools';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PromptTemplatePipelineExecutor } from '../types/PromptTemplatePipelineExecutor';

interface CreatePromptTemplatePipelineExecutorOptions {
    promptTemplatePipeline: PromptTemplatePipeline;
    tools: PromptingExecutionTools;
}

export function createPromptTemplatePipelineExecutor(
    options: CreatePromptTemplatePipelineExecutorOptions,
): PromptTemplatePipelineExecutor {
    const {
        promptTemplatePipeline,
        tools: {
            gpt: { createChatThread, /* TODO: [⛱]> completeWithGpt */ },
        },
    } = options;

    const promptTemplatePipelineExecutor = async (entryParams: PromptTemplateParams) => {
        let paramsToPass: PromptTemplateParams = entryParams;
        let currentPromptTemplate: PromptTemplate<any> | null = promptTemplatePipeline.entryPromptTemplate;

        while (currentPromptTemplate !== null) {
            const resultingParamName = promptTemplatePipeline.getResultingParamName(currentPromptTemplate!);
            const prompt = currentPromptTemplate.makePrompt(paramsToPass);

            const chatThread = await createChatThread(prompt);

            paramsToPass = {
                ...paramsToPass,
                [resultingParamName]: chatThread.response /* <- TODO: Detect param collision here */,
            };

            currentPromptTemplate = promptTemplatePipeline.getFollowingPromptTemplate(currentPromptTemplate!);
        }

        return paramsToPass;
    };

    return promptTemplatePipelineExecutor;
}

/**
 * TODO: !!! Implement
 * Note: CreatePromptTemplatePipelineExecutorOptions are just connected to PromptTemplatePipelineExecutor so do not extract to types folder
 */
