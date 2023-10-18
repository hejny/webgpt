import {
    string_javascript,
    string_markdown,
    string_prompt,
    string_template,
    string_version,
} from '../../../../../../utils/typeAliases';
import { ExecutionType } from './ExecutionTypes';
import { ModelRequirements } from './ModelRequirements';
import { ScriptLanguage } from './ScriptLanguage';

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
     * List of variables that are used across the pipeline
     */
    parameters: Array<{
        /**
         * Name of the parameter
         * - It must be unique across the pipeline
         * - It should start lowercase and contain letters and numbers
         */
        name: string;

        /**
         * The parameter is input of the pipeline
         *
         * Note: Output parameter is every parameter including input one
         */
        isInput: boolean;

        /**
         * Description of the parameter
         * - It can use simple markdown formatting like **bold**, *italic*, [link](https://example.com), ... BUT not code blocks and structure
         */
        description?: string;
    }>;
    promptTemplates: Array<{
        /**
         * Name of the parameter
         * - It must be unique across the pipeline
         * - It should start uppercase and contain letters and numbers
         */
        name: string;

        /**
         * Title of the prompt template
         * - It can use simple markdown formatting like **bold**, *italic*, [link](https://example.com), ... BUT not code blocks and structure
         */
        title: string;

        /**
         * Description of the prompt template
         * - It can use multiple paragraphs of simple markdown formatting like **bold**, *italic*, [link](https://example.com), ... BUT not code blocks and structure
         */
        description?: string;

        /**
         * Type of the execution
         * This determines if the prompt template is send to LLM, user or some scripting evaluation
         */
        executionType: ExecutionType;

        /**
         * Requirements for the model
         * - This is required only for executionType PROMPT_TEMPLATE
         */
        modelRequirements: ModelRequirements;

        /**
         * Language of the script
         * - This is required only for executionType SCRIPT
         *
         */
        contentLanguage?: ScriptLanguage;

        /**
         * Content of the template with {placeholders} for parameters
         */
        content: (string_prompt | string_javascript | string_markdown) & string_template;

        /**
         * Name of the parameter that is the result of the prompt template
         */
        resultingParameterName: string;
    }>;
}

/**
 * TODO: Better type that require scriptLanguage for executionType SCRIPT
 * TODO: [🧠] Best format of this code?
 *             There must be possible to make
 *             - Branching
 *             - Loops
 *             - Paralelization
 *             - ...and more
 * TODO: This is a cornerstone of .promptTemplatePipeline.json file
 * TODO: ust one helper type> (string_prompt | string_javascript | string_markdown) & string_template
 */
