import { string_name } from '../../../../../../utils/typeAliases';
import { validatePromptTemplatePipelineJson } from '../conversion/validatePromptTemplatePipelineJson';
import { PromptTemplateParams } from '../types/PromptTemplateParams';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson/PromptTemplatePipelineJson';
import { PromptTemplatePipelineJsonParameter } from '../types/PromptTemplatePipelineJson/PromptTemplatePipelineJsonParameter';
import { PromptTemplate } from './PromptTemplate';

/**
 * Prompt template pipeline is the **core concept of this library**.
 * It represents a series of prompt templates chained together to form a pipeline / one big prompt template with input and result params.
 *
 * It can have 3 formats:
 * -   **.ptp.md file** in custom markdown format described above
 * -   **JSON** format, parsed from the .ptp.md file
 * -   _(this)_ **Object** which is created from JSON format and bound with tools around (but not the execution logic)
 *
 * @see https://github.com/hejny/ptp#prompt-template-pipeline
 */
export class PromptTemplatePipeline<
    TInputParams extends PromptTemplateParams,
    TOutputParams extends PromptTemplateParams,
> {
    /**
     * Constructs PromptTemplatePipeline from JSON source
     *
     * Note: During the construction the source is logic validated
     *
     * @param source
     * @returns PromptTemplatePipeline
     */
    public static fromJson<TInputParams extends PromptTemplateParams, TOutputParams extends PromptTemplateParams>(
        source: PromptTemplatePipelineJson,
    ): PromptTemplatePipeline<TInputParams, TOutputParams> {
        validatePromptTemplatePipelineJson(source);

        return new PromptTemplatePipeline(
            Object.fromEntries(source.parameters.map((parameter) => [parameter.name, parameter])),
            source.promptTemplates.map(({ modelRequirements, content, resultingParameterName }) => ({
                promptTemplate: new PromptTemplate(content, modelRequirements),
                resultingParameterName,
            })),
        );
    }

    private constructor(
        private readonly parameters: Record<string_name, PromptTemplatePipelineJsonParameter>,
        private readonly promptTemplates: Array<{
            //                                <- TODO: Constrain this types such as it must contain at least one element
            //                                                                   and first one should have TInputParams
            //                                                                   and last one should have TOutputParams
            promptTemplate: PromptTemplate<PromptTemplateParams, PromptTemplateParams>;
            resultingParameterName: string;
        }>,
    ) {
        if (promptTemplates.length === 0) {
            throw new Error(`Prompt template pipeline must have at least one prompt template`);
        }
    }

    /**
     * Returns the first prompt template in the pipeline
     */
    public get entryPromptTemplate(): PromptTemplate<TInputParams, PromptTemplateParams> {
        return this.promptTemplates[0]!.promptTemplate;
    }

    /**
     * Gets the parameter that is the result of given prompt template
     */
    public getResultingParameter(
        curentPromptTemplate: PromptTemplate<PromptTemplateParams, PromptTemplateParams>,
    ): PromptTemplatePipelineJsonParameter {
        const index = this.promptTemplates.findIndex(({ promptTemplate }) => promptTemplate === curentPromptTemplate);
        if (index === -1) {
            throw new Error(`Prompt template is not in this pipeline`);
        }

        const resultingParameterName = this.promptTemplates[index]!.resultingParameterName;
        const resultingParameter = this.parameters[resultingParameterName]!;

        return resultingParameter;
    }

    /**
     * Gets the following prompt template in the pipeline or null if there is no following prompt template and this is the last one
     */
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
