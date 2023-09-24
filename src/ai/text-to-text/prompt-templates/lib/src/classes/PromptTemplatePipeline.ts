import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';
import { isPromptTemplatePipelineJsonValid } from '../validation/isPromptTemplatePipelineSourceValid';
import { PromptTemplate } from './PromptTemplate';

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
