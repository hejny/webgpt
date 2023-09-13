import { string_chat_prompt, string_model_name } from '../../utils/typeAliases';
import { getOpenaiForServer } from './getOpenaiForServer';

/**
 * Thread to the ChotGPT
 *
 * Note: This function is aviable only on the server
 */
export class ChatThread {
    /**
     * Starts a new ChatThread conversation
     *
     * @param request text to send to the OpenAI API
     * @returns response from the OpenAI API wrapped in ChatThread
     */
    public static async ask(request: string_chat_prompt): Promise<ChatThread> {
        return /* not await */ ChatThread.create(null, request);
    }

    /**
     * Makes a request to the OpenAI API and returns a response wrapped in ChatThread
     * @private utility function
     */
    private static async create(parentChatThread: null | ChatThread, request: string_chat_prompt): Promise<ChatThread> {
        const mark = `ask-gpt-${parentChatThread ? parentChatThread.chatSize : 1}`;

        performance.mark(`${mark}-start`);
        const completion = await getOpenaiForServer().chat.completions.create({
            model: 'gpt-3.5-turbo' /* <- TODO: To global config */,
            messages: [
                {
                    role: 'user',
                    content: request,
                },
            ],
        });
        performance.mark(`${mark}-end`);
        // console.log(performance.measure(mark, `${mark}-start`, `${mark}-end`));

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

        return new ChatThread(parentChatThread, completion.model as string_model_name, request, response);
    }

    private constructor(
        public readonly parent: null | ChatThread,
        public readonly model: string_model_name,
        public readonly request: string_chat_prompt,
        public readonly response: string,
    ) {}

    /**
     * Continues in ChatThread conversation
     *
     * @param request text to send to the OpenAI API
     * @returns response from the OpenAI API wrapped in ChatThread
     */
    public async ask(request: string_chat_prompt): Promise<ChatThread> {
        return /* not await */ ChatThread.create(this, request);
    }

    public get chatSize(): number {
        return this.parent ? this.parent.chatSize + 1 : 1;
    }
}

/**
 * TODO: !!! [🧠] Log author, input/output, duration, model, cost, finish_reason,... in both completeWithGpt and ChatThread
 */
