import chalk from 'chalk';
import http from 'http';
import { Server, Socket } from 'socket.io';
import spaceTrim from 'spacetrim';
import { OPENAI_API_KEY } from '../../../../../../../../../config';
import { SupabaseLoggerWrapperOfExecutionTools } from '../logger/SupabaseLoggerWrapperOfExecutionTools';
import { OpenAiExecutionTools } from '../openai/OpenAiExecutionTools';
import { Ptps_Request } from './interfaces/Ptps_Request';
import { Ptps_Response } from './interfaces/Ptps_Response';

interface RemoteServerOptions {
    readonly port: number;

    // TODO: isVerbose
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
    const { port } = options;

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

    // TODO: !!! Execution tools should be passed as dependency
    const executionTools = new OpenAiExecutionTools(OPENAI_API_KEY!);

    server.on('connection', (socket: Socket) => {
        console.log(chalk.green(`Client connected`), socket.id);

        socket.on('request', async (request: Ptps_Request) => {
            const { prompt, clientId } = request;
            // TODO: !! Validate here clientId (pass validator as dependency)
            console.log(chalk.green(`Received request`), request);

            const executionToolsForClient = new SupabaseLoggerWrapperOfExecutionTools(executionTools, clientId);

            // TODO: !! Pass PTP library as a dependency and check validity of the prompt
            // TODO: !!! Split here between completion and chat
            const promptResult = await executionToolsForClient.gptChat(prompt);

            socket.emit('response', { promptResult } satisfies Ptps_Response);

            // TODO: !! Also handle progress and errors
            // TODO: !! Disconnect after some timeout
        });

        socket.on('disconnect', () => {
            console.log(chalk.magenta(`Client disconnected`), socket.id);
        });
    });

    httpServer.listen(port);
    console.log(chalk.bgGreen(`PTP server listening on port ${port}`));
}

/**
 * TODO: !!!last Annotate
 * TODO: [🤹‍♂️] Do not hang up immediately but wait until client closes OR timeout
 * TODO: [🤹‍♂️] Timeout on chat to free up resources
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
