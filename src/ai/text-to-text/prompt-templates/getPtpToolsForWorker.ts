import { NEXT_PUBLIC_PTP_SERVER_URL } from '../../../../config';
import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import { uuid } from '../../../utils/typeAliases';
import { ExecutionTools } from './lib/src/execution/ExecutionTools';
import { RemoteNaturalExecutionTools } from './lib/src/execution/plugins/ExecutionTools/remote/RemoteNaturalExecutionTools';

/**
 * Theese are tools for PTP execution
 * Internal cache for getPtpToolsForWorker
 *
 * @private
 * @singleton
 */
let executionTools: ExecutionTools;

/**
 * Get PTP execution tools
 *
 * Note: Tools are cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in worker
 *
 * @returns ExecutionTools
 */
export function getPtpToolsForWorker(clientId: uuid) {
    if (!isRunningInWebWorker()) {
        throw new Error('This function is available ONLY in worker');
    }

    if (!executionTools) {
        executionTools = {
            natural: new RemoteNaturalExecutionTools(NEXT_PUBLIC_PTP_SERVER_URL, clientId),
            script: '!!!' as any,
            userInterface: '!!!' as any,
        };
    }

    return executionTools;
}

/**
 * TODO: [🧠] Maybe cache every clientId
 */
