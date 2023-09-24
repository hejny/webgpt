import { parsePromptTemplatePipelineString } from './parsePromptTemplatePipelineString';
import { PromptTemplatePipeline } from './PromptTemplatePipeline';

export function createPromptTemplatePipelineFromString(promptTemplatePipelineContent: string): PromptTemplatePipeline {
    const promptTemplatePipelineJson = parsePromptTemplatePipelineString(promptTemplatePipelineContent);
    return PromptTemplatePipeline.createFromJson(promptTemplatePipelineJson);
}
