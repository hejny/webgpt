import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';

/**
 * Validates prompt template pipeline source
 *
 * This validates the structure of any JSON if it is valid PromptTemplatePipelineJson
 */
export function isPromptTemplatePipelineJsonValid(
    promptTemplatePipelineJson: unknown,
): promptTemplatePipelineJson is PromptTemplatePipelineJson {
    // TODO: !! Use here some json schema validator
    return true;
}
