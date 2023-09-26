#!/usr/bin/env ts-node

import { PromptTemplatePipelineLibrary } from '../src/ai/text-to-text/prompt-templates/lib/src/classes/PromptTemplatePipelineLibrary';
import { PtpLibraryExecutor } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/PtpLibraryExecutor';

// TODO: [🧠] !!! How to use "implements" for classes
class PtpLibraryRemoteExecutor implements PtpLibraryExecutor {
    constructor(private readonly promptTemplatePipelineLibrary: PromptTemplatePipelineLibrary, remoteUrl: URL) {
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
}
