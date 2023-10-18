import { string_name } from '../../../../../../../utils/typeAliases';

/**
 * Describes one parameter of the prompt template pipeline
 */
export interface PromptTemplatePipelineJsonParameter {
    /**
     * Name of the parameter
     * - It must be unique across the pipeline
     * - It should start lowercase and contain letters and numbers
     */
    name: string_name;

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
}
