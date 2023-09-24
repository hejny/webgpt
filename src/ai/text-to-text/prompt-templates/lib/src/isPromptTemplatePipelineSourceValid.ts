import { PromptTemplatePipelineJson } from './PromptTemplatePipelineJson';

export function isPromptTemplatePipelineSourceValid(
    promptTemplatePipelineSource: unknown,
): promptTemplatePipelineSource is PromptTemplatePipelineJson {
    // TODO: !! Use here some json schema validator
    return true;
}
