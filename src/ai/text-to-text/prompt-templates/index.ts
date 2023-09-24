import { readFile } from 'fs/promises';
import { join } from 'path';
import { isRunningInNode } from '../../../utils/isRunningInWhatever';
import { string_file_path, uuid } from '../../../utils/typeAliases';
import { ChatThread } from '../ChatThread';
import { completeWithGpt } from '../completeWithGpt';
import { PromptTemplatePipeline } from './lib/src/classes/PromptTemplatePipeline';
import { promptTemplatePipelineStringToJson } from './lib/src/conversion/promptTemplatePipelineStringToJson';
import { createPromptTemplatePipelineExecutor } from './lib/src/execution/createPromptTemplatePipelineExecutor';
import { PromptTemplateParams } from './lib/src/types/PromptTemplateParams';
import { PromptTemplatePipelineExecutor } from './lib/src/types/PromptTemplatePipelineExecutor';
import { PromptTemplatePipelineString } from './lib/src/types/PromptTemplatePipelineString';

/**
 * @@@
 *
 * @private
 */
let writeWebsiteContentExecutor: PromptTemplatePipelineExecutor | null;

/**
 * @@@
 *
 * @private
 */
async function importPtp(path: string_file_path): Promise<PromptTemplatePipelineString> {
    return (await readFile(join(__dirname, path), 'utf-8')) as PromptTemplatePipelineString;
}

/**
 * !!!
 *
 * Note: The client is cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in server/node
 */
export async function writeWebsiteContent(entryParams: PromptTemplateParams): Promise<PromptTemplateParams> {
    if (!writeWebsiteContentExecutor) {
        if (!isRunningInNode()) {
            throw new Error('Prompt template executors are only available on the server');
        }

        writeWebsiteContentExecutor = createPromptTemplatePipelineExecutor({
            promptTemplatePipeline: PromptTemplatePipeline.fromJson(
                promptTemplatePipelineStringToJson(
                    await importPtp(
                        '../../../../prompts/templates/write-website-content.en.md.ptp' /* <- TODO: !!! Pass to helper */,
                    ),
                ),
            ),
            tools: {
                gpt: {
                    createChatThread: async (prompt) => ChatThread.ask(prompt, '!!!!!!!!' as uuid),
                    completeWithGpt: async (prompt) => completeWithGpt(prompt, '!!!!!!!!' as uuid),
                },
            },
        });
    }

    return /* not await */ writeWebsiteContentExecutor(entryParams);
}

/**
 * TODO: !!! Make helper
 * TODO: This should be auto-generated from the /prompts/templates/ folder
 */
