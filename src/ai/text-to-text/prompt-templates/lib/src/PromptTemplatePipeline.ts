import { ChatThread } from '../../../ChatThread';
import { ICompleteWithGptResult } from '../../../completeWithGpt';
import { isPromptTemplatePipelineJsonValid } from './isPromptTemplatePipelineSourceValid';
import { Prompt } from './Prompt';
import { PromptTemplate } from './PromptTemplate';
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
        if (!isPromptTemplatePipelineJsonValid(source)) {
            // TODO: Better error message - maybe even error from isPromptTemplatePipelineSourceValid -> validatePromptTemplatePipelineSource
            throw new Error('Invalid propmt template pipeline source');
        }
        return new PromptTemplatePipeline(
            source.promptTemplates.map(({ promptTemplate, resultingParamName }) => ({
                promptTemplate: new PromptTemplate(promptTemplate),
                resultingParamName,
            })),
        );
    }

    private constructor(
        private readonly promptTemplates: Array<{
            promptTemplate: PromptTemplate<any /* <- TODO: Get rid of any */>;
            resultingParamName: string;
        }>,
    ) {}
}

/**
 * TODO: [🧠] There should or should not be a word "GPT" in both createChatThread and completeWithGpt
 */
