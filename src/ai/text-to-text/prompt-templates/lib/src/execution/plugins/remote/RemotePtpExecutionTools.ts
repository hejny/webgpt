import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { uuid } from '../../../../../../../../utils/typeAliases';
import { Prompt } from '../../../classes/Prompt';
import { PromptChatResult, PromptResult } from '../../PromptResult';
import { PtpExecutionTools } from '../../PtpExecutionTools';
import { Ptps_Request } from './interfaces/Ptps_Request';
import { Ptps_Response } from './interfaces/Ptps_Response';

export class RemotePtpExecutionTools implements PtpExecutionTools {
    constructor(private readonly remoteUrl: URL, private readonly clientId: uuid) {}

    private makeConnection(): Promise<Socket> {
        return new Promise((resolve, reject) => {
            const socket = io(this.remoteUrl.href, {
                transports: ['websocket', 'polling'],
            });
            socket.on('connect', () => {
                resolve(socket);
            });
        });
    }

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
 * TODO: !!! Annotate
 * TODO: !!! Create some common util for gptChat and gptComplete
 * TODO: [🤹‍♂️] RemotePtpExecutionTools should extend Destroyable and implement IDestroyable
 */
