import { string_model_name, uuid } from '../../../../../../utils/typeAliases';
import { Prompt } from '../classes/Prompt';

/**
 * Create conversation with ChatGPT
 *
 * Note: This class is aviable only on the server
 */
export interface ChatThread {
    readonly clientId: uuid /* <-[🌺] */;
    readonly parent: null | ChatThread;
    readonly model: string_model_name;
    readonly prompt: Prompt;
    readonly response: string;
    readonly chatSize: number;

    /**
     * Continues in ChatThread conversation
     *
     * @param prompt text to send to the OpenAI API
     * @returns response from the OpenAI API wrapped in ChatThread
     */
    ask(prompt: Prompt): Promise<ChatThread>;
}

/**
 * TODO: !!! Annotate
 * TODO: [🧠] Wording: response or answer?
 * TODO: Make IAskOptions
 */
