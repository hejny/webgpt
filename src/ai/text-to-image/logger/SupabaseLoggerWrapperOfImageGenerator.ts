import spaceTrim from 'spacetrim';
import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
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

    /**
     * Generates image and log the result
     */
    public async generate(
        prompt: ImagePrompt,
        onProgress: (taskProgress: WebgptTaskProgress) => void,
    ): Promise<Array<ImagePromptResult>> {
        const mark = 'gpt-call';
        const promptAt = new Date();
        performance.mark(`${mark}-start`);

        try {
            const promptResults = await this.options.imageGenerator.generate(prompt, onProgress);

            performance.mark(`${mark}-end`);
            const resultAt = new Date();

            for (const promptResult of promptResults) {
                if (this.options.isVerbose) {
                    console.info(
                        spaceTrim(
                            (block) => `
                                ===========================[ Chat: ]===
                                [🧑] ${block(prompt.content)}
                                [🤖] Generated ${block(promptResult.imageSrc)}
                                ---
                                Executed in ${block(
                                    performance.measure(mark, `${mark}-start`, `${mark}-end`).duration.toString(),
                                )}ms
                                ===========================[ /Chat ]===
                            `,
                            // <- TODO: Maybe put here some token spend metrics
                        ),
                    );
                }

                // Note: We do not want to wait for the insert to the database
                /* not await */ getSupabaseForServer()
                    .from('ImagePromptExecution')
                    .insert(
                        {
                            // Prompt:
                            clientId: this.options.clientId,
                            ptbkUrl: null /* <- TODO: [🧠] Add here some identification */,
                            promptAt,
                            prompt: prompt,
                            promptContent: prompt.content,

                            // Prompt Result:
                            resultAt,
                            result: promptResult,

                            resultSrc: promptResult.imageSrc,
                            usedModel: promptResult.normalizedPrompt.model,
                            rawResponse: promptResult.rawResponse,

                            // <- TODO: [💹] There should be link to wallpaper site which is the prompt for (to analyze cost per wallpaper)
                            // <- TODO: Maybe use here more precise performance measure
                        } as any /* <- TODO: [🖍] It is working in runtime BUT for some strange reason it invokes typescript error */,
                    )
                    .then((insertResult) => {
                        // TODO: !! Util isInsertSuccessfull

                        if (this.options.isVerbose) {
                            console.info('ChatThread', { insertResult });
                        }
                    });
            }

            return promptResults;
        } catch (error) {
            console.error('SupabaseLoggerWrapperOfImageGenerator', { error });
            throw error;
        }
    }
}

/**
 * TODO: Log also failed results
 */
