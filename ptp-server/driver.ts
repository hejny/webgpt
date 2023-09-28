#!/usr/bin/env ts-node

import { Prompt } from '../src/ai/text-to-text/prompt-templates/lib/src/classes/Prompt';
import { ChatThread } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/ChatThread';
import { PromptResult } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/PromptResult';
import { PtpExecutionTools } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/PtpExecutionTools';
import { RemoteChatThread } from './RemoteChatThread.ts.delete';

class PtpRemoteExecutionTools implements PtpExecutionTools {
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
 * TODO: [🧭] !! Make @ptp/remote-tools from this
 * TODO: [🧠] Maybe split PtpExecutionTools into PtpGptExecutionTools, PtpLogExecutionTools,...
 */
