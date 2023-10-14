import OpenAI from 'openai';
import spaceTrim from 'spacetrim';
import { getSupabaseForServer } from '../../../../../../../../utils/supabase/getSupabaseForServer';
import { string_token } from '../../../../../../../../utils/typeAliases';
import { Prompt } from '../../../types/Prompt';
import { PromptChatResult } from '../../PromptResult';
import { PtpExecutionTools } from '../../PtpExecutionTools';

/**
 * Execution Tools for calling OpenAI API.
 */
export class OpenAiExecutionTools implements PtpExecutionTools {
    /**
     * OpenAI API client.
     */
    private readonly openai: OpenAI;

    public constructor(openAiApiKey: string_token, private readonly clientId: string) {
        this.openai = new OpenAI({
            apiKey: openAiApiKey,
        });
    }

    /**
     * Calls OpenAI API to use a chat model.
     */
    public async gptChat(prompt: Prompt): Promise<PromptChatResult> {
        const { request, modelRequirements } = prompt;

        // TODO: Use here more modelRequirements
        if (modelRequirements.variant !== 'CHAT') {
            throw new Error(`Use gptChat only for CHAT variant`);
        }

        const mark = `gpt-chat`;
        const promptAt = new Date();
        performance.mark(`${mark}-start`);
        const model = 'gpt-3.5-turbo'; /* <- TODO: To global config */
        const modelSettings = { model };
        const completion = await this.openai.chat.completions.create({
            ...modelSettings,
            messages: [
                {
                    role: 'user',
                    content: request,
                },
            ],
        });
        performance.mark(`${mark}-end`);
        const answerAt = new Date();
        // console.log(performance.measure(mark, `${mark}-start`, `${mark}-end`));

        if (!completion.choices[0]) {
            // [5]
            throw new Error(`No choises from OpenAPI`);
        }

        if (completion.choices.length > 1) {
            // TODO: This should be maybe only warning
            // [5]
            throw new Error(`More than one choise from OpenAPI`);
        }

        // Display response message to user
        const response = completion.choices[0].message.content;

        if (!response) {
            // [5]
            throw new Error(`No response message from OpenAPI`);
        }

        /**/
        // TODO: [🧠] Make config value DEBUG_LOG_GPT
        console.info(
            spaceTrim(
                (block) => `
                    ===========================[ Chat: ]===
                    [🧑] ${block(prompt.request)}
                    [🤖] ${block(response)}
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
            .from('Prompt')
            .insert(
                {
                    // Metadata
                    type: 'CHAT',
                    clientId: this.clientId,
                    metadata: {
                        /* TODO: Is metadata needed? */
                    },

                    // Model
                    model,
                    modelSettings,

                    // Prompt
                    prompt: prompt,
                    systemMessage: null,
                    // TODO: !!previousExternalId: parentChatThread ? parentChatThread. : null,
                    promptAt,

                    // Response
                    answer: response,
                    externalId: null,
                    fullCompletion: completion,
                    answerAt,

                    // <- TODO: [💹] There should be link to wallpaper site which is the prompt for (to analyze cost per wallpaper)
                    // <- TODO: [🎠] There should be a prompt template+template version+template language version (to A/B test performance of prompts)
                    // <- TODO: Use here more precise performance measure
                } as any /* <- TODO: [🖍] It is working in runtime BUT for some strange reason it invokes typescript error */,
            )
            .then((insertResult) => {
                // TODO: !! Util isInsertSuccessfull
                // console.log('ChatThread', { insertResult });
            });

        return {
            response,
            model,
            // <- [🤹‍♂️]
        };
    }
}

/**
 * TODO: Pass here apiKey
 * TODO: !!!last Annotate
 * TODO: !!! Create some common util for gptChat and gptComplete
 * TODO: [🧠] Logging+performance measure should be responsibility of some common/abstract code NOT OpenAiExecutionTools
 */
