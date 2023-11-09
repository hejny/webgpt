import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import type { ImageGenerator } from '../0-interfaces/ImageGenerator';
import type { ImagePrompt } from '../0-interfaces/ImagePrompt';
import type { ImagePromptResult } from '../0-interfaces/ImagePromptResult';
import type { Imgs_Error } from './interfaces/Imgs_Error';
import type { Imgs_Request } from './interfaces/Imgs_Request';
import type { Imgs_Response } from './interfaces/Imgs_Response';
import type { RemoteNaturalExecutionToolsOptions } from './interfaces/RemoteNaturalExecutionToolsOptions';

/**
 * Image generator called remotely
 */
export class RemoteImageGenerator implements ImageGenerator {
    public constructor(private readonly options: RemoteNaturalExecutionToolsOptions) {}

    /**
     * Creates a connection to the remote proxy server.
     */
    private makeConnection(): Promise<Socket> {
        return new Promise((resolve, reject) => {
            const socket = io(this.options.remoteUrl.href, {
                path: '/promptimage/socket.io',
                // path: `${this.remoteUrl.pathname}/socket.io`,
                transports: [/*'websocket', <- TODO: [🌬] Make websocket transport work */ 'polling'],
            });

            console.log('Connecting to', this.options.remoteUrl.href, { socket });

            socket.on('connect', () => {
                resolve(socket);
            });

            setTimeout(() => {
                reject(new Error(`Timeout while connecting to ${this.options.remoteUrl.href}`));
            }, 60000 /* <- TODO: Timeout to config */);
        });
    }

    public async generate(prompt: ImagePrompt): Promise<Array<ImagePromptResult>> {
        const socket = await this.makeConnection();
        socket.emit('request', { clientId: this.options.clientId, prompt } satisfies Imgs_Request);

        const promptResult = await new Promise<Array<ImagePromptResult>>((resolve, reject) => {
            socket.on('response', (response: Imgs_Response) => {
                resolve(response.promptResult);
                socket.disconnect();
            });
            socket.on('error', (error: Imgs_Error) => {
                //            <- TODO: Custom type of error
                reject(new Error(error.errorMessage));
                socket.disconnect();
            });
        });

        socket.disconnect();

        return promptResult;
    }
}

/**
 * TODO: [🤹‍♂️] RemoteImageGenerator should extend Destroyable and implement IDestroyable
 */
