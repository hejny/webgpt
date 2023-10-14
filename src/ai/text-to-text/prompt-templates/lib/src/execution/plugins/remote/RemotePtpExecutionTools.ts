import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { uuid } from '../../../../../../../../utils/typeAliases';
import { Prompt } from '../../../types/Prompt';
import { PromptChatResult, PromptResult } from '../../PromptResult';
import { PtpExecutionTools } from '../../PtpExecutionTools';
import { Ptps_Request } from './interfaces/Ptps_Request';
import { Ptps_Response } from './interfaces/Ptps_Response';

/**
 * Remote server is a proxy server that uses its execution tools internally and exposes the executor interface externally.
 *
 * You can simply use `RemoteExecutionTools` on client-side javascript and connect to your remote server.
 * This is useful to make all logic on browser side but not expose your API keys or no need to use customer's GPU.
 *
 * @see https://github.com/hejny/ptp#remote-server
 */
export class RemotePtpExecutionTools implements PtpExecutionTools {
    constructor(private readonly remoteUrl: URL, private readonly clientId: uuid) {}

    private makeConnection(): Promise<Socket> {
        return new Promise((resolve, reject) => {
            const socket = io(this.remoteUrl.href, {
                path: '/ptp/socket.io',
                // path: `${this.remoteUrl.pathname}/socket.io`,
                transports: [/*'websocket', <- TODO: [🌬] Make websocket transport work */ 'polling'],
            });

            console.log('Connecting to', this.remoteUrl.href, { socket });

            socket.on('connect', () => {
                resolve(socket);
            });

            setTimeout(() => {
                reject(new Error(`Timeout while connecting to ${this.remoteUrl.href}`));
            }, 60000 /* <- TODO: Timeout to config */);
        });
    }

    /**
     * Calls remote proxy server to use a chat model.
     */
    public async gptChat(prompt: Prompt): Promise<PromptChatResult> {
        const { request, modelRequirements } = prompt;

        if (modelRequirements.variant !== 'CHAT') {
            throw new Error(`Use gptChat only for CHAT variant`);
        }

        const socket = await this.makeConnection();
        socket.emit('request', { clientId: this.clientId, prompt } satisfies Ptps_Request);

        const promptResult = await new Promise<PromptResult>((resolve, reject) => {
            socket.on('response', (response: Ptps_Response) => {
                resolve(response.promptResult);
            });
        });

        socket.disconnect();

        return promptResult;
    }
}

/**
 * TODO: !!!last Annotate
 * TODO: !!! Create some common util for gptChat and gptComplete
 * TODO: [🤹‍♂️] RemotePtpExecutionTools should extend Destroyable and implement IDestroyable
 */
