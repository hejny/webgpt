import writeWebsiteContentPtp from '../../../../prompts/templates/write-website-content.ptp.md';
import { uuid } from '../../../utils/typeAliases';
import { ChatThread } from '../ChatThread';
import { completeWithGpt } from '../completeWithGpt';
import { PromptTemplatePipeline } from './lib/src/classes/PromptTemplatePipeline';
import { promptTemplatePipelineStringToJson } from './lib/src/conversion/promptTemplatePipelineStringToJson';
import { createPromptTemplatePipelineExecutor } from './lib/src/execution/createPromptTemplatePipelineExecutor';

export const writeWebsiteContent = createPromptTemplatePipelineExecutor({
    promptTemplatePipeline: PromptTemplatePipeline.fromJson(promptTemplatePipelineStringToJson(writeWebsiteContentPtp)),
    tools: {
        gpt: {
            createChatThread: async (prompt) => ChatThread.ask(prompt, '!!!!!!!!' as uuid),
            completeWithGpt: async (prompt) => completeWithGpt(prompt, '!!!!!!!!' as uuid),
        },
    },
});

/**
 * TODO: !!! Make helper
 * TODO: This should be auto-generated from the /prompts/templates/ folder
 */
