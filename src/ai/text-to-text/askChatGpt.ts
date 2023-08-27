import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../config';
import { isRunningInNode } from '../../utils/isRunningInWhatever';
import { string_chat_prompt, string_model_name } from '../../utils/typeAliases';
import { getOpenaiForServer } from './getOpenaiForServer';

export interface IAskChatGptResult {
    response: string;
    model: string_model_name;
}



/**
 * Ask one question to the GPT chat
 *
 * Note: This function is aviable only on the server
 */
export async function askChatGpt(prompt: string_chat_prompt): Promise<IAskChatGptResult> {

    performance.mark('ask-gpt-start');
    const completion = await getOpenaiForServer().chat.completions.create({
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

/**
 * TODO: !!! Make chainable
 */
