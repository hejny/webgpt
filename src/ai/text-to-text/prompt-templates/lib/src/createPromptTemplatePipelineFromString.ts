import { parsePromptTemplatePipelineString } from './parsePromptTemplatePipelineString';
import { PromptTemplatePipeline } from './PromptTemplatePipeline';

export function createPromptTemplatePipelineFromString(promptTemplatePipelineContent: string): PromptTemplatePipeline {
    const source = parsePromptTemplatePipelineString(promptTemplatePipelineContent);
    return PromptTemplatePipeline.createFromJson(source);
}
