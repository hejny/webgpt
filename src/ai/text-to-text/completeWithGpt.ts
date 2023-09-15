import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';
import { string_completion_prompt, string_model_name, uuid } from '../../utils/typeAliases';
import { getOpenaiForServer } from './getOpenaiForServer';

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
    prompt: string_completion_prompt,
    clientId: uuid /* <-[🌺] */,
): Promise<ICompleteWithGptResult> {
    const promptAt = new Date();
    performance.mark('complete-gpt-start');
    const model = 'text-davinci-003';
    const modelSettings = {
        model,
        max_tokens: 500,
        // <- TODO: [🤡] Tweak, hardcode+note or put in config + Pick the best model, max_tokens, top_t,... other params
    };
    const completion = await getOpenaiForServer().completions.create({
        ...modelSettings,
        prompt,
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

    // Note: We do not want to wait for the insert to the database
    /* not await */ getSupabaseForServer()
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
                answer: response,
                externalId: null,
                fullCompletion: completion,
                answerAt,
            } as any /* <- TODO: [🖍] It is working in runtime BUT for some strange reason it invokes typescript error */,
        )
        .then((insertResult) => {
            // TODO: !! Util isInsertSuccessfull (status===201)
            console.info('completeWithGpt', { insertResult });
        });

    return {
        response,
        model: completion.model as string_model_name,
    };
}

/**
 * TODO: [🧠] Wording: response or answer?
 * TODO: [🧠][5] Log also failed requests
 * TODO: Make ICompleteWithGptOptions
 */
