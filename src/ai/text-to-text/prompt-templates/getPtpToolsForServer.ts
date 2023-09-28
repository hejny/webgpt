import { isRunningInNode } from '../../../utils/isRunningInWhatever';
import { uuid } from '../../../utils/typeAliases';
import { OpenAiChatGptThread } from '../OpenAiChatGptThread.ts.delete';
import { openAiCompleteWithGpt } from '../openAiCompleteWithGpt.ts.delete';
import { PtpExecutionTools } from './lib/src/execution/PtpExecutionTools';

/**
 * Theese are tools for PTP execution
 * Internal cache for getPtpToolsForServer
 *
 * @private
 * @singleton
 */
let ptpExecutionTools: PtpExecutionTools;

/**
 * Get PTP execution tools
 *
 * Note: Tools are cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in node, use getPtpToolsForBrowser in node
 *
 * @returns PtpExecutionTools
 */
export function getPtpToolsForServer() {
    if (!isRunningInNode()) {
        throw new Error('Use getPtpToolsForBrowser');
    }

    if (!ptpExecutionTools) {
        ptpExecutionTools = {
            gpt: {
                createChatThread: async (prompt) =>
                    OpenAiChatGptThread.ask(
                        prompt,
                        'aaaaaaaa-d669-414e-b066-e9733f0de7a8' /* <- TODO: !!! Pass here real UUID + Make some SYSTEM_UUID etc */ as uuid,
                    ),
                completeWithGpt: async (prompt) =>
                    openAiCompleteWithGpt(
                        prompt,
                        'aaaaaaaa-d669-414e-b066-e9733f0de7a8' /* <- TODO: !!! Pass here real UUID + Make some SYSTEM_UUID etc */ as uuid,
                    ),
            },
        } /* <- TODO: [🧭] !! Make @ptp/openai-tools from this */;
    }

    return ptpExecutionTools;
}

/**
 * TODO: !!! (Make tools for each client + execution library for each client) OR Client should be responsibility in PTP
 */
