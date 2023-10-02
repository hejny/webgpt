import { string_attribute } from '../../../../../../utils/typeAliases';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';
import { isPromptTemplatePipelineJsonValid } from '../validation/isPromptTemplatePipelineSourceValid';
import { PromptTemplate } from './PromptTemplate';

export class PromptTemplatePipeline<
    TEntryParams extends PromptTemplateParams,
    TResultParams extends PromptTemplateParams,
> {
    public static fromJson<TEntryParams extends PromptTemplateParams, TResultParams extends PromptTemplateParams>(
        source: PromptTemplatePipelineJson,
    ): PromptTemplatePipeline<TEntryParams, TResultParams> {
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
            //                                <- TODO: Constrain this types such as it must contain at least one element
            //                                                                   and first one should have TEntryParams
            //                                                                   and last one should have TResultParams
            promptTemplate: PromptTemplate<PromptTemplateParams, PromptTemplateParams>;
            resultingParamName: string;
        }>,
    ) {
        if (promptTemplates.length === 0) {
            throw new Error(`Prompt template pipeline must have at least one prompt template`);
        }
    }

    public get entryPromptTemplate(): PromptTemplate<TEntryParams, PromptTemplateParams> {
        return this.promptTemplates[0]!.promptTemplate;
    }

    public getResultingParamName(
        curentPromptTemplate: PromptTemplate<PromptTemplateParams, PromptTemplateParams>,
    ): string_attribute {
        const index = this.promptTemplates.findIndex(({ promptTemplate }) => promptTemplate === curentPromptTemplate);
        if (index === -1) {
            throw new Error(`Prompt template is not in this pipeline`);
        }

        return this.promptTemplates[index]!.resultingParamName;
    }

    public getFollowingPromptTemplate(
        curentPromptTemplate: PromptTemplate<PromptTemplateParams, PromptTemplateParams>,
    ): PromptTemplate<PromptTemplateParams, PromptTemplateParams> | null {
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
 * TODO: !! Add generic type for entry and result params
 * TODO: Can be Array elegantly typed such as it must have at least one element?
 * TODO: [🧠] Each PromptTemplatePipeline should have its unique hash to be able to compare them and execute on server ONLY the desired ones
 * TODO: [🧠] Some method to compare PromptTemplatePipeline, PromptTemplate, Prompt, PromptExecution
 * TODO: !!!last Rename supabase table Prompt to PromptExecution (Prompt + PromptResult) to be more clear
 */
