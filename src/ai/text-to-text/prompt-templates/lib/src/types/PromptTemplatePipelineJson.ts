import {
    string_javascript,
    string_markdown,
    string_prompt,
    string_template,
    string_version,
} from '../../../../../../utils/typeAliases';
import { ExecutionType } from './ExecutionTypes';
import { ModelRequirements } from './ModelRequirements';

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
    ptpVersion: string_version;
    parameters: Array<{ name: string; description?: string }>;
    promptTemplates: Array<{
        title: string;
        description?: string;
        executionType: ExecutionType;
        modelRequirements?: ModelRequirements;
        scriptLanguage?: ScriptLanguage /* <- TODO: Better type that require scriptLanguage for executionType SCRIPT */;
        promptTemplate: (string_prompt | string_javascript | string_markdown) &
            string_template /* <- TODO: Just one helper type */;
        resultingParameterName: string;
    }>;
}
SUPPORTED_SCRIPT_LANGUAGES;
/**
 * TODO: [🧠] Best format of this code?
 *             There must be possible to make
 *             - Branching
 *             - Loops
 *             - Paralelization
 *             - ...and more
 * TODO: This is a cornerstone of .promptTemplatePipeline.json file
 */
