import { PromptTemplatePipeline } from '../classes/PromptTemplatePipeline';
import { parsePromptTemplatePipelineString } from './parsePromptTemplatePipelineString';

export function createPromptTemplatePipelineFromString(promptTemplatePipelineContent: string): PromptTemplatePipeline {
    const promptTemplatePipelineJson = parsePromptTemplatePipelineString(promptTemplatePipelineContent);
    return PromptTemplatePipeline.createFromJson(promptTemplatePipelineJson);
}
