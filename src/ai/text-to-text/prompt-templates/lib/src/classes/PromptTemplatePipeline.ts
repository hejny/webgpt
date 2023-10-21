import { string_name } from '../../../../../../utils/typeAliases';
import { validatePromptTemplatePipelineJson } from '../conversion/validatePromptTemplatePipelineJson';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson/PromptTemplatePipelineJson';
import { PromptTemplatePipelineJsonParameter } from '../types/PromptTemplatePipelineJson/PromptTemplatePipelineJsonParameter';
import { PromptTemplatePipelineJsonTemplate } from '../types/PromptTemplatePipelineJson/PromptTemplatePipelineJsonTemplate';

/**
 * Prompt template pipeline is the **core concept of this library**.
 * It represents a series of prompt templates chained together to form a pipeline / one big prompt template with input and result parameters.
 *
 * It can have 3 formats:
 * -   **.ptp.md file** in custom markdown format described above
 * -   **JSON** format, parsed from the .ptp.md file
 * -   _(this)_ **Object** which is created from JSON format and bound with tools around (but not the execution logic)
 *
 * @see https://github.com/webgptorg/ptp#prompt-template-pipeline
 */
export class PromptTemplatePipeline {
    /**
     * Constructs PromptTemplatePipeline from JSON source
     *
     * Note: During the construction the source is logic validated
     *
     * @param source
     * @returns PromptTemplatePipeline
     */
    public static fromJson(source: PromptTemplatePipelineJson): PromptTemplatePipeline {
        validatePromptTemplatePipelineJson(source);

        return new PromptTemplatePipeline(
            Object.fromEntries(source.parameters.map((parameter) => [parameter.name, parameter])),
            source.promptTemplates,
        );
    }

    private constructor(
        private readonly parameters: Record<string_name, PromptTemplatePipelineJsonParameter>,
        private readonly promptTemplates: Array<PromptTemplatePipelineJsonTemplate>,
    ) {
        if (promptTemplates.length === 0) {
            throw new Error(`Prompt template pipeline must have at least one prompt template`);
        }
    }

    /**
     * Returns the first prompt template in the pipeline
     */
    public get entryPromptTemplate(): PromptTemplatePipelineJsonTemplate {
        return this.promptTemplates[0]!;
    }

    /**
     * Gets the parameter that is the result of given prompt template
     */
    public getResultingParameter(promptTemplateName: string_name): PromptTemplatePipelineJsonParameter {
        const index = this.promptTemplates.findIndex(({ name }) => name === promptTemplateName);
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
    public getFollowingPromptTemplate(promptTemplateName: string_name): PromptTemplatePipelineJsonTemplate | null {
        const index = this.promptTemplates.findIndex(({ name }) => name === promptTemplateName);
        if (index === -1) {
            throw new Error(`Prompt template is not in this pipeline`);
        }

        if (index === this.promptTemplates.length - 1) {
            return null;
        }

        return this.promptTemplates[index + 1]!;
    }
}

/**
 * TODO: !! Add generic type for entry and result parameters
 * TODO: Can be Array elegantly typed such as it must have at least one element?
 * TODO: [🧠] Each PromptTemplatePipeline should have its unique hash to be able to compare them and execute on server ONLY the desired ones
 */
