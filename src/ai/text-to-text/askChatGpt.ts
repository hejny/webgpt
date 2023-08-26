import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../config';
import { isRunningInNode } from '../../utils/isRunningInWhatever';
import { string_model_name, string_prompt } from '../../utils/typeAliases';

export interface IAskChatGptReturn {
    response: string;
    model: string_model_name;
}

/**
 * TODO: Make this lazy on-demand
 */
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY!,
});

/**
 * Ask one question to the GPT chat
 *
 * Note: This function is aviable only on the server
 */
export async function askChatGpt(prompt: string_prompt): Promise<IAskChatGptReturn> {
    if (!isRunningInNode()) {
        throw new Error('askChatGpt is only available on the server');
    }

    performance.mark('ask-gpt-start');
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo' /* <- TODO: To global config */,
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
    });
    performance.mark('ask-gpt-end');
    console.log(performance.measure('ask-gpt', 'ask-gpt-start', 'ask-gpt-end'));

    if (!completion.choices[0]) {
        throw new Error(`No choises from OpenAPI`);
    }

    if (completion.choices.length > 1) {
        // TODO: This should be maybe only warning
        throw new Error(`More than one choise from OpenAPI`);
    }

    // Display response message to user
    const response = completion.choices[0].message.content;

    if (!response) {
        throw new Error(`No response message from OpenAPI`);
    }

    return {
        response,
        model: completion.model as string_model_name,
    };
}
