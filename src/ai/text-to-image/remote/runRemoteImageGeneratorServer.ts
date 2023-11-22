import chalk from 'chalk';
import http from 'http';
import { Server, Socket } from 'socket.io';
import spaceTrim from 'spacetrim';
import type { CreateRemoteImageGeneratorServerOptions } from './interfaces/CreateRemoteImageGeneratorServerOptions';
import type { Imgs_Error } from './interfaces/Imgs_Error';
import { Imgs_Request } from './interfaces/Imgs_Request';
import type { Imgs_Response } from './interfaces/Imgs_Response';

/**
 * Remote server is a proxy server that remotelly generates images
 *
 * You can simply use `RemoteImageGenerator` on client-side javascript and connect to your remote server.
 * This is useful to make all logic on browser side but not expose your API keys or no need to use customer's GPU.
 */
export function runRemoteImageGeneratorServer(options: CreateRemoteImageGeneratorServerOptions) {
    const { port, path, createImageGenerator, isVerbose } = options;

    const httpServer = http.createServer({}, (request, response) => {
        if (request.url?.includes('socket.io')) {
            return;
        }

        response.write(
            spaceTrim(`
                Server for processing ImageGenerator requests is running

                For more information look at:
                https://github.com/webgptorg/promptbook

            `),
        );
        response.end();
    });

    const server: Server = new Server(httpServer, {
        path,
        transports: [/*'websocket', <- TODO: [🌬] Make websocket transport work */ 'polling'],
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    server.on('connection', (socket: Socket) => {
        console.log(chalk.gray(`Client connected`), socket.id);

        socket.on('request', async (request: Imgs_Request) => {
            const { prompt, clientId } = request;
            // TODO: !! Validate here clientId (pass validator as dependency)

            if (isVerbose) {
                console.info(chalk.bgGray(`Prompt:`), chalk.gray(JSON.stringify(request, null, 4)));
            }

            try {
                const imageGenerator = createImageGenerator(clientId);
                const promptResult = await imageGenerator.generate(prompt, () => {
                    // TODO: !! Pass progress
                });

                if (isVerbose) {
                    console.info(chalk.bgGreen(`PromptResult:`), chalk.green(JSON.stringify(promptResult, null, 4)));
                }

                socket.emit('response', { promptResult } satisfies Imgs_Response);
            } catch (error) {
                if (!(error instanceof Error)) {
                    throw error;
                }

                socket.emit('error', { errorMessage: error.message } satisfies Imgs_Error);
            } finally {
                socket.disconnect();
            }
        });

        socket.on('disconnect', () => {
            // TODO: Destroy here executionToolsForClient
            if (isVerbose) {
                console.info(chalk.gray(`Client disconnected`), socket.id);
            }
        });
    });

    httpServer.listen(port);

    // Note: We want to log this also in non-verbose mode
    console.info(chalk.bgGreen(`PTP server listening on port ${port}`));
    if (isVerbose) {
        console.info(chalk.green(`Verbose mode is enabled`));
    }
}

/**
 * TODO: Handle progress - support streaming
 * TODO: [🤹‍♂️] Do not hang up immediately but wait until client closes OR timeout
 * TODO: [🤹‍♂️] Timeout on chat to free up resources
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
