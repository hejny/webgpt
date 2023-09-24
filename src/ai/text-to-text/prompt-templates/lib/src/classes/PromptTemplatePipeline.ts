import { string_attribute } from '../../../../../../utils/typeAliases';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';
import { isPromptTemplatePipelineJsonValid } from '../validation/isPromptTemplatePipelineSourceValid';
import { PromptTemplate } from './PromptTemplate';

export class PromptTemplatePipeline {
    public static fromJson(source: PromptTemplatePipelineJson): PromptTemplatePipeline {
        if (!isPromptTemplatePipelineJsonValid(source)) {
            // TODO: Better error message - maybe even error from isPromptTemplatePipelineSourceValid -> validatePromptTemplatePipelineSource
            throw new Error('Invalid propmt template pipeline source');
        }
        return new PromptTemplatePipeline(
            source.promptTemplates.map(({ modelRequirements, promptTemplate, resultingParamName }) => ({
                promptTemplate: new PromptTemplate(promptTemplate, modelRequirements),
                resultingParamName,
            })),
        );
    }

    private constructor(
        private readonly promptTemplates: Array<{
            promptTemplate: PromptTemplate<any /* <- TODO: Get rid of any */>;
            resultingParamName: string;
        }>,
    ) {
        if (promptTemplates.length === 0) {
            throw new Error(`Prompt template pipeline must have at least one prompt template`);
        }
    }

    public get entryPromptTemplate(): PromptTemplate<any /* <- TODO: Get rid of any */> {
        return this.promptTemplates[0]!.promptTemplate;
    }

    public getResultingParamName(
        curentPromptTemplate: PromptTemplate<any /* <- TODO: Get rid of any */>,
    ): string_attribute {
        const index = this.promptTemplates.findIndex(({ promptTemplate }) => promptTemplate === curentPromptTemplate);
        if (index === -1) {
            throw new Error(`Prompt template is not in this pipeline`);
        }

        return this.promptTemplates[index]!.resultingParamName;
    }

    public getFollowingPromptTemplate(
        curentPromptTemplate: PromptTemplate<any /* <- TODO: Get rid of any */>,
    ): PromptTemplate<any /* <- TODO: Get rid of any */> | null {
        const index = this.promptTemplates.findIndex(({ promptTemplate }) => promptTemplate === curentPromptTemplate);
        if (index === -1) {
            throw new Error(`Prompt template is not in this pipeline`);
        }

        if (index === this.promptTemplates.length - 1) {
            return null;
        }

        return this.promptTemplates[index + 1]!.promptTemplate;
    }
}

/**
 * TODO: !!! Add generic type for entry and result params
 * TODO: Can be Array elegantly typed such as it must have at least one element?
 * TODO: [🧠] There should or should not be a word "GPT" in both createChatThread and completeWithGpt
 */
