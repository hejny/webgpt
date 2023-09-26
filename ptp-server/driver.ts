#!/usr/bin/env ts-node

import { PromptTemplatePipelineLibrary } from '../src/ai/text-to-text/prompt-templates/lib/src/classes/PromptTemplatePipelineLibrary';
import { PromptTemplatePipelineLibraryExecutor } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/PromptTemplatePipelineLibraryExecutor';

class PromptTemplatePipelineLibraryRemoteExecutor implements PromptTemplatePipelineLibraryExecutor {
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
