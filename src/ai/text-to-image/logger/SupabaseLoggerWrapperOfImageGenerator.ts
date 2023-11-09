import spaceTrim from 'spacetrim';
import { isRunningInNode } from '../../../utils/isRunningInWhatever';
import { getSupabaseForServer } from '../../../utils/supabase/getSupabaseForServer';
import { ImageGenerator } from '../0-interfaces/ImageGenerator';
import { ImagePrompt } from '../0-interfaces/ImagePrompt';
import { ImagePromptResult } from '../0-interfaces/ImagePromptResult';
import { SupabaseLoggerWrapperOfImageGeneratorOptions } from './SupabaseLoggerWrapperOfImageGeneratorOptions';

/**
 * Wrapper for any ImageGenerator which logs every request+result to Supabase.
 */
export class SupabaseLoggerWrapperOfImageGenerator implements ImageGenerator {
    public constructor(private readonly options: SupabaseLoggerWrapperOfImageGeneratorOptions) {
        if (!isRunningInNode()) {
            throw new Error('SupabaseLoggerWrapperOfImageGenerator can be used only on server');
        }
    }

    // !!! Array<ImagePromptResult> -> ImagePromptResult

    /**
     * Generates image and log the result
     */
    public async gptCommon(prompt: ImagePrompt): Promise<Array<ImagePromptResult>> {
        const mark = 'gpt-call';
        const promptAt = new Date();
        performance.mark(`${mark}-start`);

        try {
            const promptResult = await this.options.imageGenerator.generate(prompt);

            performance.mark(`${mark}-end`);
            const resultAt = new Date();

            if (this.options.isVerbose) {
                console.info(
                    spaceTrim(
                        (block) => `
                        ===========================[ Chat: ]===
                        [🧑] ${block(prompt.content)}
                        [🤖] Generated ${block(promptResult.length.toString())}
                        ---
                        Executed in ${block(
                            performance.measure(mark, `${mark}-start`, `${mark}-end`).duration.toString(),
                        )}ms
                        ${(promptResult.rawResponse as any).usage?.total_tokens} tokens used
                        ===========================[ /Chat ]===
                    `,
                    ),
                );
            }

            // Note: We do not want to wait for the insert to the database
            /* not await */ getSupabaseForServer()
                .from('ImagePromptExecution')
                .insert  (
                    {
                        clientId: this.options.clientId,
                        ptpUrl: prompt.ptbkUrl /* <- TODO: [🧠] Change to ptbkUrl OR keep */,
                        promptAt,
                        promptContent: prompt.content,
                        rawPrompt
                        resultAt,
                        resultUrl,
                        resultCdnUrl,
                        usedModel: promptResult.model,
                        rawResponse: promptResult.rawResponse,

                        // <- TODO: [💹] There should be link to wallpaper site which is the prompt for (to analyze cost per wallpaper)
                        // <- TODO: Maybe use here more precise performance measure
                    } /* as any /* <- TODO: [🖍] It is working in runtime BUT for some strange reason it invokes typescript error */,
                )
                .then((insertResult) => {
                    // TODO: !! Util isInsertSuccessfull

                    if (this.options.isVerbose) {
                        console.info('ChatThread', { insertResult });
                    }
                });

            return promptResult;
        } catch (error) {
            console.error('SupabaseLoggerWrapperOfNaturalExecutionTools', { error });
            throw error;
        }
    }
}

/**
 * TODO: Log also failed results
 */
