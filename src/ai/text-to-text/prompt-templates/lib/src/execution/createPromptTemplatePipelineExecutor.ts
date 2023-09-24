import { PromptingExecutionTools } from '../types/PromptingExecutionTools';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PromptTemplatePipelineExecutor } from '../types/PromptTemplatePipelineExecutor';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';

interface CreatePromptTemplatePipelineExecutorOptions {
    promptTemplatePipeline: PromptTemplatePipelineJson;
    tools: PromptingExecutionTools;
}

export function createPromptTemplatePipelineExecutor(
    options: CreatePromptTemplatePipelineExecutorOptions,
): PromptTemplatePipelineExecutor {
    const { promptTemplatePipeline, tools } = options;

    return async () => {
        /*
        
          const {
            params,
            gpt: { createChatThread, completeWithGpt },
        } = options;
        let paramsToPass: PromptTemplateParams = params;

        for (const { promptTemplate, resultingParamName } of promptTemplatePipeline.promptTemplates) {
            const prompt = promptTemplate.makePrompt(paramsToPass);

            const chatThread = await createChatThread(prompt);

            paramsToPass = {
                ...paramsToPass,
                [resultingParamName]: chatThread.response /* <- TODO: Detect param collision here * /,
            };
        }

        return paramsToPass;
        */
        return {} as PromptTemplateParams;
    };
}

/**
 * TODO: !!! Implement
 * Note: CreatePromptTemplatePipelineExecutorOptions are just connected to PromptTemplatePipelineExecutor so do not extract to types folder
 */
