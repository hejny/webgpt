import { isRunningInNode } from '../../../../../../../../../utils/isRunningInWhatever';
import { getSupabaseForServer } from '../../../../../../../../../utils/supabase/getSupabaseForServer';
import { uuid } from '../../../../../../../../../utils/typeAliases';
import { Prompt } from '../../../../types/Prompt';
import { NaturalExecutionTools } from '../../../NaturalExecutionTools';
import { PromptChatResult, PromptCompletionResult, PromptResult } from '../../../PromptResult';

/**
 * Wrapper for any PtpExecutionTools which logs every request+result to Supabase.
 */
export class SupabaseLoggerWrapperOfNaturalExecutionTools implements NaturalExecutionTools {
    public constructor(private readonly naturalExecutionTools: NaturalExecutionTools, private readonly clientId: uuid) {
        if (!isRunningInNode()) {
            throw new Error(`SupabaseLoggerWrapperOfExecutionTools can be used only on server`);
        }
    }

    /**
     * Calls a chat model and logs the request+result
     */
    public gptChat(prompt: Prompt): Promise<PromptChatResult> {
        return /* not await */ this.gptCommon(prompt);
    }

    /**
     * Calls a completion model and logs the request+result
     */
    public gptComplete(prompt: Prompt): Promise<PromptCompletionResult> {
        return /* not await */ this.gptCommon(prompt);
    }

    /**
     * Calls both completion or chat model and logs the request+result
     */
    public async gptCommon(prompt: Prompt): Promise<PromptResult> {
        const mark = `gpt-call`;
        const promptAt = new Date();
        performance.mark(`${mark}-start`);

        let promptResult: PromptResult;
        switch (prompt.modelRequirements.variant) {
            case 'CHAT':
                promptResult = await this.naturalExecutionTools.gptChat(prompt);
                break;
            case 'COMPLETION':
                promptResult = await this.naturalExecutionTools.gptComplete(prompt);
                break;
            default:
                throw new Error(`Unknown model variant "${prompt.modelRequirements.variant}"`);
        }

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
                    // TODO: !!! Spread values inserting into PromptExecution
                    // TODO: !!! Update table PromptExecution according to new fields in Prompt and PromptChatResult
                    clientId: this.clientId,
                    ptpUrl: prompt.ptpUrl,
                    promptAt,
                    promptContent: prompt.content,
                    promptModelRequirements: prompt.modelRequirements,
                    promptParameters: prompt.parameters,
                    resultAt,
                    resultContent: promptResult.content,
                    usedModel: promptResult.model,
                    rawResponse: promptResult.rawResponse,

                    // <- TODO: [💹] There should be link to wallpaper site which is the prompt for (to analyze cost per wallpaper)
                    // <- TODO: Maybe use here more precise performance measure
                } as any /* <- TODO: [🖍] It is working in runtime BUT for some strange reason it invokes typescript error */,
            )
            .then((insertResult) => {
                // TODO: !! Util isInsertSuccessfull
                // console.log('ChatThread', { insertResult });
            });

        return promptResult;
    }
}

/**
 * TODO: [🧠] Best name for this class "SupabaseLoggerWrapperOfNaturalExecutionTools" vs "NaturalExecutionToolsWithSupabaseLogger" or just helper "withSupabaseLogger"
 * TODO: Log also failed results
 * TODO: [🧠] Maybe do equivalent for UserInterfaceTools OR make this for whole ExecutionTools
 * TODO: Create abstract LoggerWrapperOfNaturalExecutionTools which can be extended to implement more loggers
 */
