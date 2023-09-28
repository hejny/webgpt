import { PtpExecutionTools } from '../../PtpExecutionTools';

export class PtpRemoteExecutionTools implements PtpExecutionTools {
    constructor(remoteUrl: URL) {
        /*
        const socket = new SocketIoClient(serverUrl);
        socket.on('connect', () => {
            console.log(chalk.green(`Client connected: ${socketConnection.id}`));
        });
        socket.on('disconnect', () => {
            console.log(chalk.magenta(`Client disconnected: ${socketConnection.id}`));
        });
        socket.on('request', (options: Ptps_Request) => {
            const {} = options;
            console.log(chalk.green(`New request`), options);

            socketConnection.send('response', {} satisfies Ptps_Response);
        */
    }

    createChatThread(prompt: Prompt): Promise<ChatThread> {
        return RemoteChatThread.ask(/* !!! */);
    }

    completeWithGpt(prompt: Prompt): Promise<PromptResult> {
        throw new Error('Method not implemented.' /* <- TODO: !!! Implement */);
    }
}

/**
 * TODO: !!! Annotate
 */
