import chalk from 'chalk';
import http from 'http';
import { Server, Socket } from 'socket.io';
import spaceTrim from 'spacetrim';
import { PromptTemplatePipelineLibrary } from '../../../../classes/PromptTemplatePipelineLibrary';
import { PromptResult } from '../../../PromptResult';
import { SupabaseLoggerWrapperOfExecutionTools } from '../logger/SupabaseLoggerWrapperOfExecutionTools';
import { OpenAiExecutionTools } from '../openai/OpenAiExecutionTools';
import { Ptps_Request } from './interfaces/Ptps_Request';
import { Ptps_Response } from './interfaces/Ptps_Response';

interface RemoteServerOptions {
    /**
     * Port on which the server will listen
     */
    readonly port: number;

    /**
     * Prompt template pipeline library to use
     *
     * THis is used to checkl validity of the prompt to prevent DDoS
     */
    readonly ptpLibrary: PromptTemplatePipelineLibrary;

    /**
     * Execution tools to use
     *
     * Note: Theese tools will be wrapped in a logger for each client to log all requests
     */
    readonly executionTools: OpenAiExecutionTools;

    /**
     * If true, the server will log all requests and responses
     */
    readonly isVerbose?: boolean;
}

/**
 * Remote server is a proxy server that uses its execution tools internally and exposes the executor interface externally.
 *
 * You can simply use `RemoteExecutionTools` on client-side javascript and connect to your remote server.
 * This is useful to make all logic on browser side but not expose your API keys or no need to use customer's GPU.
 *
 * @see https://github.com/hejny/ptp#remote-server
 */
export function createRemoteServer(options: RemoteServerOptions) {
    const { port, ptpLibrary, executionTools, isVerbose } = options;

    const httpServer = http.createServer({}, (request, response) => {
        if (request.url?.includes('socket.io')) {
            return;
        }

        response.write(
            spaceTrim(`
                Server for processing PTP requests is running

                For more information look at:
                https://github.com/hejny/ptp

            `),
        );
        response.end();
    });

    const server: Server = new Server(httpServer, {
        path: '/ptp/socket.io',
        transports: [/*'websocket', <- TODO: [🌬] Make websocket transport work */ 'polling'],
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    server.on('connection', (socket: Socket) => {
        console.log(chalk.gray(`Client connected`), socket.id);

        socket.on('request', async (request: Ptps_Request) => {
            const { prompt, clientId } = request;
            // TODO: !! Validate here clientId (pass validator as dependency)

            if (isVerbose) {
                console.info(chalk.bgGray(`  Prompt:  `), chalk.gray(JSON.stringify(request, null, 4)));
            }

            const executionToolsForClient = new SupabaseLoggerWrapperOfExecutionTools(executionTools, clientId);

            // TODO: !!! Check validity of the prompt against ptpLibrary

            let promptResult: PromptResult;
            switch (prompt.modelRequirements.variant) {
                case 'CHAT':
                    promptResult = await executionToolsForClient.gptChat(prompt);
                    break;
                case 'COMPLETION':
                    promptResult = await executionToolsForClient.gptComplete(prompt);
                    break;
                default:
                    throw new Error(`Unknown model variant "${prompt.modelRequirements.variant}"`);
            }

            if (isVerbose) {
                console.info(chalk.bgGreen(`  PromptResult:  `), chalk.green(JSON.stringify(promptResult, null, 4)));
            }

            socket.emit('response', { promptResult } satisfies Ptps_Response);

            // TODO: !!! Handle errors
            // TODO: !! Handle progress
            // TODO: !! Disconnect after some timeout
        });

        socket.on('disconnect', () => {
            // TODO: Destroy here executionToolsForClient
            if (isVerbose) {
                console.info(chalk.gray(`Client disconnected`), socket.id);
            }
        });
    });

    httpServer.listen(port);

    if (isVerbose) {
        console.info(chalk.bgGreen(`PTP server listening on port ${port}`));
    }
}

/**
 * TODO: [🤹‍♂️] Do not hang up immediately but wait until client closes OR timeout
 * TODO: [🤹‍♂️] Timeout on chat to free up resources
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
