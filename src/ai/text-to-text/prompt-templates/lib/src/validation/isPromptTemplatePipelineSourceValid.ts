import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';

export function isPromptTemplatePipelineJsonValid(
    promptTemplatePipelineJson: unknown,
): promptTemplatePipelineJson is PromptTemplatePipelineJson {
    // TODO: !! Use here some json schema validator
    return true;
}
