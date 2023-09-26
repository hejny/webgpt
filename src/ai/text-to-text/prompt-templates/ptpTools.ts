import { uuid } from '../../../utils/typeAliases';
import { ChatThread } from '../ChatThread';
import { completeWithGpt } from '../completeWithGpt';
import { PtpExecutionTools } from './lib/src/types/PtpExecutionTools';

/**
 * Theese are tools for PTP execution
 *
 * @singleton
 */
export const ptpExecutionTools: PtpExecutionTools = {
    gpt: {
        createChatThread: async (prompt) =>
            ChatThread.ask(
                prompt,
                'aaaaaaaa-d669-414e-b066-e9733f0de7a8' /* <- TODO: !!! Pass here real UUID + Make some SYSTEM_UUID etc */ as uuid,
            ),
        completeWithGpt: async (prompt) =>
            completeWithGpt(
                prompt,
                'aaaaaaaa-d669-414e-b066-e9733f0de7a8' /* <- TODO: !!! Pass here real UUID + Make some SYSTEM_UUID etc */ as uuid,
            ),
    },
};

/**
 * TODO: [🧠] !!! Where should be this
 * TODO: !!! (Make tools for each client + execution library for each client) OR Client should be responsibility in PTP
 */
