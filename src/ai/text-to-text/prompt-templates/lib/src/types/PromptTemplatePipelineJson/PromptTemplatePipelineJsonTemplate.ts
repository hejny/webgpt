import {
    string_javascript,
    string_markdown,
    string_name,
    string_prompt,
    string_template,
} from '../../../../../../../utils/typeAliases';
import { ExecutionType } from '../ExecutionTypes';
import { ModelRequirements } from '../ModelRequirements';
import { ScriptLanguage } from '../ScriptLanguage';

/**
 * Describes one prompt template in the prompt template pipeline
 */
export interface PromptTemplatePipelineJsonTemplate {
    /**
     * Name of the parameter
     * - It must be unique across the pipeline
     * - It should start uppercase and contain letters and numbers
     */
    name: string_name;

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
    modelRequirements?: ModelRequirements;

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
}

/**
 * TODO: !!! Rename to PromptTemplateJson
 * TODO: Better type that require scriptLanguage for executionType SCRIPT - split between 'PromptTemplateJson', 'SimpleTemplateJson', 'ScriptJson', 'PromptDialogJson'
 * TODO: ust one helper type> (string_prompt | string_javascript | string_markdown) & string_template
 */
