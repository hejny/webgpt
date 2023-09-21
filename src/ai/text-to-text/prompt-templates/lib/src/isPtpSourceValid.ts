import { PromptTemplatePipelineJson } from './PromptTemplatePipelineJson';

export function isPtpSourceValid(ptpSource: unknown): ptpSource is PromptTemplatePipelineJson {
    // TODO: !! Use here some json schema validator
    return true;
}
