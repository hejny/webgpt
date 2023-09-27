import { Prompt } from '../src/ai/text-to-text/prompt-templates/lib/src/classes/Prompt';
import { ChatThread } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/ChatThread';
import { string_model_name, uuid } from '../src/utils/typeAliases';

/**
 * @private helper for PtpRemoteExecutionTools
 */
export class RemoteChatThread /* [🍬] extends Destroyable */ implements ChatThread {
    public static async ask(prompt: Prompt, clientId: uuid /* <-[🌺] */): Promise<RemoteChatThread> {
        return /* not await */ RemoteChatThread.create(null, prompt, clientId);
    }

    private static async create(
        parentChatThread: null | ChatThread,
        prompt: Prompt,
        clientId: uuid /* <-[🌺] */,
    ): Promise<ChatThread> {
        const model = 'gpt-3.5-turbo'; /* <- TODO: To global config */
        const modelSettings = { model };

        // TODO: !!! Implement

        return new RemoteChatThread(
            clientId,
            parentChatThread,
            completion.model as string_model_name,
            prompt,
            response,
        );
    }

    private constructor(
        public readonly clientId: uuid /* <-[🌺] */,
        public readonly parent: null | ChatThread,
        public readonly model: string_model_name,
        public readonly prompt: Prompt,
        public readonly response: string,
    ) {}

    public async ask(prompt: Prompt): Promise<ChatThread> {
        return /* not await */ RemoteChatThread.create(this, prompt, this.clientId);
    }

    public get chatSize(): number {
        return this.parent ? this.parent.chatSize + 1 : 1;
    }

    /*
    [🍬]
    public async destroy() {
        socket.disconnect();
        return this.destroy();
    }
    */
}

/**
 * TODO: !!! Annotate
 */
