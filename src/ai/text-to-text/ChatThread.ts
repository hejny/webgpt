import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';
import { string_chat_prompt, string_model_name, uuid } from '../../utils/typeAliases';
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
    public static async ask(request: string_chat_prompt, clientId: uuid /* <-[🌺] */): Promise<ChatThread> {
        return /* not await */ ChatThread.create(null, request, clientId);
    }

    /**
     * Makes a request to the OpenAI API and returns a response wrapped in ChatThread
     * @private utility function
     */
    private static async create(
        parentChatThread: null | ChatThread,
        request: string_chat_prompt,
        clientId: uuid /* <-[🌺] */,
    ): Promise<ChatThread> {
        const mark = `ask-gpt-${parentChatThread ? parentChatThread.chatSize : 1}`;

        const promptAt = new Date();
        performance.mark(`${mark}-start`);
        const model = 'gpt-3.5-turbo'; /* <- TODO: To global config */
        const modelSettings = { model };
        const completion = await getOpenaiForServer().chat.completions.create({
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

        // Note: We do not want to wait for the insert to the database
        /* not await */ getSupabaseForServer()
            .from('Prompt')
            .insert({
                // Metadata
                type: 'CHAT',
                clientId,
                metadata: {
                    /* TODO: Is metadata needed? */
                },

                // Model
                model,
                modelSettings,

                // Prompt
                prompt: request,
                systemMessage: null,
                // TODO: !!previousExternalId: parentChatThread ? parentChatThread. : null,
                promptAt,

                // Response
                answer: response,
                externalId: null,
                fullCompletion: completion,
                answerAt,
            })
            .then((insertResult) => {
                // TODO: !! Util isInsertSuccessfull (status===201)
                console.info('ChatThread', { insertResult });
            });

        return new ChatThread(clientId, parentChatThread, completion.model as string_model_name, request, response);
    }

    private constructor(
        public readonly clientId: uuid /* <-[🌺] */,
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
        return /* not await */ ChatThread.create(this, request, this.clientId);
    }

    public get chatSize(): number {
        return this.parent ? this.parent.chatSize + 1 : 1;
    }
}

/**
 * TODO: [🧠] response or answer?
 * TODO: [🧠][5] Log also failed requests
 * TODO: Make IAskOptions
 */
