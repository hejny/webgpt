import { isRunningInNode } from '../../../../../../../../utils/isRunningInWhatever';
import { getSupabaseForServer } from '../../../../../../../../utils/supabase/getSupabaseForServer';
import { Prompt } from '../../../types/Prompt';
import { PromptChatResult, PromptCompletionResult } from '../../PromptResult';
import { PtpExecutionTools } from '../../PtpExecutionTools';

/**
 * Wrapper for any PtpExecutionTools which logs every request+result to Supabase.
 */
export class SupabaseLoggerWrapperOfExecutionTools implements PtpExecutionTools {
    public constructor(private readonly ptpExecutionTools: PtpExecutionTools, private readonly clientId: string) {
        if (!isRunningInNode()) {
            throw new Error(`SupabaseLoggerWrapperOfExecutionTools can be used only on server`);
        }
    }

    /**
     * Calls a chat model and logs the request+result
     */
    public async gptChat(prompt: Prompt): Promise<PromptChatResult> {
        const mark = `gpt-chat`;
        const promptAt = new Date();
        performance.mark(`${mark}-start`);

        const result = await this.ptpExecutionTools.gptChat(prompt);

        performance.mark(`${mark}-end`);
        const resultAt = new Date();

        /*/
        // TODO: [🧠] Make config value DEBUG_LOG_GPT
        console.info(
            spaceTrim(
                (block) => `
                    ===========================[ Chat: ]===
                    [🧑] ${block(prompt.request)}
                    [🤖] ${block(result.response)}
                    ---
                    Executed in ${block(
                        performance.measure(mark, `${mark}-start`, `${mark}-end`).duration.toString(),
                    )}ms 
                    ${completion.usage?.total_tokens} tokens used
                    ===========================[ /Chat ]===
                `,
            ),
        );
        /**/

        // Note: We do not want to wait for the insert to the database
        /* not await */ getSupabaseForServer()
            .from('PromptExecution')
            .insert(
                {
                    clientId: this.clientId,
                    promptAt,
                    prompt,
                    resultAt,
                    result,

                    // <- TODO: [💹] There should be link to wallpaper site which is the prompt for (to analyze cost per wallpaper)
                    // <- TODO: [🎠] There should be a prompt template+template version+template language version (to A/B test performance of prompts)
                    // <- TODO: Use here more precise performance measure
                } /* TODO: !!! Remove or uncomment> as any /* <- TODO: [🖍] It is working in runtime BUT for some strange reason it invokes typescript error */,
            )
            .then((insertResult) => {
                // TODO: !! Util isInsertSuccessfull
                // console.log('ChatThread', { insertResult });
            });

        return result;
    }

    /**
     * Calls a completion model and logs the request+result
     */
    public async gptComplete(prompt: Prompt): Promise<PromptCompletionResult> {}
}

/**
 * TODO: [🧠] Best name for this class "SupabaseLoggerWrapperOfExecutionTools" vs "ExecutionToolsWithSupabaseLogger" or just helper "withSupabaseLogger"
 * TODO: Maybe Create some common util for gptChat and gptComplete
 * TODO: Log also failed results
 * TODO: Create abstract LoggerWrapperOfExecutionTools which can be extended to implement more loggers
 */
