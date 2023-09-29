import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import { uuid } from '../../../utils/typeAliases';
import { RemotePtpExecutionTools } from './lib/src/execution/plugins/remote/RemotePtpExecutionTools';
import { PtpExecutionTools } from './lib/src/execution/PtpExecutionTools';

/**
 * Theese are tools for PTP execution
 * Internal cache for getPtpToolsForWorker
 *
 * @private
 * @singleton
 */
let ptpExecutionTools: PtpExecutionTools;

/**
 * Get PTP execution tools
 *
 * Note: Tools are cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in worker
 *
 * @returns PtpExecutionTools
 */
export function getPtpToolsForWorker(clientId: uuid) {
    if (!isRunningInWebWorker()) {
        throw new Error('This function is available ONLY in worker');
    }

    if (!ptpExecutionTools) {
        ptpExecutionTools = new RemotePtpExecutionTools(
            new URL('http://localhost:4445/' /* <- TODO: !!! Unhardcode */),
            clientId,
        );
    }

    return ptpExecutionTools;
}

/**
 * TODO: [🧠] Maybe cache every clientId
 */
