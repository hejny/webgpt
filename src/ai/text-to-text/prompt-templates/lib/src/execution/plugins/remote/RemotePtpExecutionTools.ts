import { PtpExecutionTools } from '../../PtpExecutionTools';
import { SocketIoClient } from 'socket.io-client';

export class RemotePtpExecutionTools implements PtpExecutionTools {
    constructor(private readonly remoteUrl: URL, private readonly clientId: string) {
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

    public async gptChat(prompt: Prompt): Promise<PromptChatResult> {

        const socket = new SocketIoClient(serverUrl);
        socket.on('connect', () => {

            
            
        });
      
    }
}

/**
 * TODO: !!! Annotate
 * TODO: !!! Create some common util for gptChat and gptComplete
 * TODO: [🤹‍♂️] RemotePtpExecutionTools should extend Destroyable and implement IDestroyable
 */
