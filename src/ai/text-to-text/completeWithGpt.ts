import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';
import { string_model_name, uuid } from '../../utils/typeAliases';
import { getOpenaiForServer } from './getOpenaiForServer';
import { Prompt } from './prompt-templates/lib/src/classes/Prompt';

export interface ICompleteWithGptResult {
    response: string;
    model: string_model_name;
}

/**
 * Complete a prompt with GPT
 *
 * Note: This function is aviable only on the server
 */
export async function completeWithGpt(
    prompt: Prompt<'COMPLETION'>,
    clientId: uuid /* <-[🌺] */,
): Promise<ICompleteWithGptResult> {
    const model = 'text-davinci-003';
    const modelSettings = {
        model,
        max_tokens: 500,
        // <- TODO: Tweak, hardcode+note or put in config + Pick the best model, max_tokens, top_t,... other params
    };
    const promptAt = new Date();

    // Note: We do not want to wait for the insert to the database
    const promptIdPromise = /* not await */ getSupabaseForServer()
        .from('Prompt')
        .insert(
            {
                // Metadata
                type: 'COMPLETION',
                clientId,
                metadata: {
                    /* TODO: Is metadata needed? */
                },

                // Model
                model,
                modelSettings,

                // Prompt
                prompt,
                systemMessage: null,
                previousExternalId: null,
                promptAt,

                // Response
                answer: null,
                externalId: null,
                fullCompletion: null,
                answerAt: null,

                // <- TODO: [💹] There should be link to wallpaper site which is the prompt for (to analyze cost per wallpaper)
                // <- TODO: [🎠] There should be a prompt template+template version+template language version (to A/B test performance of prompts)
            } as any /* <- TODO: [🖍] It is working in runtime BUT for some strange reason it invokes typescript error */,
        )
        .select()
        .then((insertSelectResult) => {
            // TODO: !! Util isInsertSuccessfull / isInsertSelectSuccessfull which returns the id
            // console.log('completeWithGpt', { insertSelectResult });

            if (insertSelectResult.data === null) {
                throw new Error('insertResult.data is null');
            }

            if (!insertSelectResult.data[0]) {
                throw new Error('insertResult.data has no rows');
            }

            return insertSelectResult.data[0].id;
        });

    performance.mark('complete-gpt-start');
    const completion = await getOpenaiForServer().completions.create({
        ...modelSettings,
        prompt: prompt.toString(),
    });
    performance.mark('complete-gpt-end');
    const answerAt = new Date();
    // console.log(performance.measure('complete-gpt', 'complete-gpt-start', 'complete-gpt-end'));

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
    const response = completion.choices[0].text;

    // Note: We do not want to wait for the update in the database
    /* not await */ promptIdPromise
        .then((promptId) => {
            // console.log({ promptId });
            return getSupabaseForServer()
                .from('Prompt')
                .update(
                    {
                        // Response
                        answer: response,
                        externalId: null,
                        fullCompletion: completion,
                        answerAt,
                    } as any /* <- TODO: [🖍] It is working in runtime BUT for some strange reason it invokes typescript error */,
                )
                .eq('id', promptId);
        })
        .then((updateResult) => {
            // TODO: !! Util isUpdateSuccessfull
            // console.log('completeWithGpt', { updateResult });
        });

    return {
        response,
        model: completion.model as string_model_name,
    };
}

/**
 * TODO: (Probbably no) Are there failed requests - analyze them
 *                      Make some statistics for PromptTemeplates
 * TODO: DRY ChatThread+completeWithGpt
 * TODO: [🧠] Wording: response or answer?
 * TODO: [🧠][5] Log also failed requests
 * TODO: Make ICompleteWithGptOptions
 */
