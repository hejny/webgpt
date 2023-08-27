import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../config';
import { isRunningInNode } from '../../utils/isRunningInWhatever';
import { string_completion_prompt, string_model_name } from '../../utils/typeAliases';
import { getOpenaiForServer } from './getOpenaiForServer';

export interface ICompleteWithGptResult {
    response: string;
    model: string_model_name;
}

/**
 * TODO: !!! Make this lazy on-demand + DRY ACRY
 */
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY!,
});

/**
 * Complete a prompt with GPT
 *
 * Note: This function is aviable only on the server
 */
export async function completeWithGpt(prompt: string_completion_prompt): Promise<ICompleteWithGptResult> {


    performance.mark('complete-gpt-start');
    const completion = await getOpenaiForServer().completions.create({
        model: 'davinci-002' /* <- TODO: !!! Pick the best model */,
        // max_tokens: 1000,
        prompt,
    });
    performance.mark('complete-gpt-end');
    console.log(performance.measure('complete-gpt', 'complete-gpt-start', 'complete-gpt-end'));

    if (!completion.choices[0]) {
        throw new Error(`No choises from OpenAPI`);
    }

    if (completion.choices.length > 1) {
        // TODO: This should be maybe only warning
        throw new Error(`More than one choise from OpenAPI`);
    }

    // Display response message to user
    const response = completion.choices[0].text;

    return {
        response,
        model: completion.model as string_model_name,
    };
}

/**
 * TODO: !!! Make chainable
 */
