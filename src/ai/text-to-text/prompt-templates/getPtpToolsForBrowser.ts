import { isRunningInBrowser } from '../../../utils/isRunningInWhatever';
import { PtpExecutionTools } from './lib/src/execution/PtpExecutionTools';

/**
 * Theese are tools for PTP execution
 * Internal cache for getPtpToolsForBrowser
 *
 * @private
 * @singleton
 */
let ptpExecutionTools: PtpExecutionTools;

/**
 * Get PTP execution tools
 *
 * Note: Tools are cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in browser, use getPtpToolsForServer in node
 *
 * @returns PtpExecutionTools
 */
export function getPtpToolsForBrowser() {
    if (!isRunningInBrowser()) {
        throw new Error('Use getPtpToolsForServer');
    }

    if (!ptpExecutionTools) {
        ptpExecutionTools = new PtpRemoteExecutionTools();
    }

    return ptpExecutionTools;
}

/**
 * TODO: !!! (Make tools for each client + execution library for each client) OR Client should be responsibility in PTP
 */
