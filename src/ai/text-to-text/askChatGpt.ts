import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../config';
import { isRunningInNode } from '../../utils/isRunningInWhatever';

export interface IAskChatGptOptions {
    requestText: string;
    // TODO: Model here GPT3 vs GPT4
}

export interface IAskChatGptReturn {
    responseText: string;
    metadataText: string;
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY!,
});

/**
 * Ask one question to the GPT chat
 *
 * Note: This function is aviable only on the server
 */
export async function askChatGpt(options: IAskChatGptOptions): Promise<IAskChatGptReturn> {
    if (!isRunningInNode()) {
        throw new Error('askChatGpt is only available on the server');
    }

    const { requestText } = options;

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: requestText,
            },
        ],
    });

    if (!completion.choices[0]) {
        throw new Error(`No choises from OpenAPI`);
    }

    if (completion.choices.length > 1) {
        // TODO: This should be maybe only warning
        throw new Error(`More than one choise from OpenAPI`);
    }

    // Display response message to user
    const responseMessage = completion.choices[0].message.content;

    if (!responseMessage) {
        throw new Error(`No response message from OpenAPI`);
    }

    return {
        responseText: responseMessage,
        metadataText: `Using ${completion.model}`,
    };
}
