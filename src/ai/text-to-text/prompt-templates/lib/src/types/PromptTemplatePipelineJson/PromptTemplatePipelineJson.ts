import { string_version } from '../../../../../../../utils/typeAliases';
import { PromptTemplatePipelineJsonParameter } from './PromptTemplatePipelineJsonParameter';
import { PromptTemplatePipelineJsonTemplate } from './PromptTemplatePipelineJsonTemplate';

/**
 * Prompt template pipeline is the **core concept of this library**.
 * It represents a series of prompt templates chained together to form a pipeline / one big prompt template with input and result params.
 *
 * It can have 3 formats:
 * -   **.ptp.md file** in custom markdown format described above
 * -   _(this)_ **JSON** format, parsed from the .ptp.md file
 * -   **Object** which is created from JSON format and bound with tools around (but not the execution logic)
 *
 * @see https://github.com/hejny/ptp#prompt-template-pipeline
 */
export interface PromptTemplatePipelineJson {
    /**
     * Version of the .ptp.json file
     */
    ptpVersion: string_version;

    /**
     * Set of variables that are used across the pipeline
     */
    parameters: Array<PromptTemplatePipelineJsonParameter>;

    /**
     * Sequence of prompt templates that are chained together to form a pipeline
     */
    promptTemplates: Array<PromptTemplatePipelineJsonTemplate>;
}

/**
 * TODO: [🧠] Best format of this code?
 *             There must be possible to make
 *             - Branching
 *             - Loops
 *             - Paralelization
 *             - ...and more
 */
