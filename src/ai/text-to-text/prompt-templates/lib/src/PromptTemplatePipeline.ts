import { ChatThread } from '../../../ChatThread';
import { ICompleteWithGptResult } from '../../../completeWithGpt';
import { isPtpSourceValid } from './isPtpSourceValid';
import { Prompt } from './Prompt';
import { PromptTemplateParams } from './PromptTemplateParams';
import { PromptTemplatePipelineJson } from './PromptTemplatePipelineJson';

interface PromptTemplatePipelineRunOptions {
    params: PromptTemplateParams;
    gpt: {
        createChatThread(prompt: Prompt<'CHAT'>): Promise<ChatThread>;
        completeWithGpt(prompt: Prompt<'COMPLETION'>): Promise<ICompleteWithGptResult>;
    };
}

export class PromptTemplatePipeline {
    public static createFromJson(source: PromptTemplatePipelineJson): PromptTemplatePipeline {
        if (!isPtpSourceValid(source)) {
            // TODO: Better error message - maybe even error from isPtpSourceValid -> validatePtpSource
            throw new Error('Invalid propmt template pipeline source');
        }
        return new PromptTemplatePipeline(source);
    }

    private constructor(public readonly source: PromptTemplatePipelineJson) {}

    public async runPrompts(options: PromptTemplatePipelineRunOptions): Promise<PromptTemplateParams> {
        const {
            params,
            gpt: { createChatThread, completeWithGpt },
        } = options;
        let paramsToPass: PromptTemplateParams = params;

        for (const { promptTemplate, resultingParamName } of this.source.promptTemplates) {
            const prompt = promptTemplate.makePrompt(paramsToPass);

            const chatThread = await createChatThread(prompt);

            paramsToPass = {
                ...paramsToPass,
                [resultingParamName]: chatThread.response /* <- TODO: Detect param collision here */,
            };
        }

        return paramsToPass;
    }
}

/**
 * TODO: [🧠] There should or should not be a word "GPT" in both createChatThread and completeWithGpt
 */
