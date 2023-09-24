import { PromptingExecutionTools } from './PromptingExecutionTools';
import { PromptTemplateParams } from './PromptTemplateParams';
import { PromptTemplatePipelineExecutor } from './PromptTemplatePipelineExecutor';
import { PromptTemplatePipelineJson } from './PromptTemplatePipelineJson';

interface CreatePromptTemplatePipelineExecutorOptions {
    promptTemplatePipeline: PromptTemplatePipelineJson;
    tools: PromptingExecutionTools;
}

export function createPromptTemplatePipelineExecutor(): PromptTemplatePipelineExecutor {
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
 */
