import { isRunningInNode } from '../isRunningInWhatever';
import type { VerifyEmailCodeRequest, VerifyEmailCodeResult } from './verifyEmailCode.types';

/**
 * Function verifyEmailCode @@@
 *
 * @returns true if code is valid
 * @throws CodeValidationError if code is invalid
 *
 * Note: This function has version both for browser and server
 */
export async function $verifyEmailCodeForServer(options: VerifyEmailCodeRequest): Promise<VerifyEmailCodeResult> {
    if (!isRunningInNode()) {
        throw new Error(
            'Function `$verifyEmailCodeForBrowser` can not be used in browser or worker, use browser version instead.',
        );
    }
}

/**
 * TODO: [🌯] Create some system (simmilar to Workerify) which can create server functions exposed in client through API in some DRY way
 *
 * TODO: !!! Implement
 * TODO: !!!last Annotate
 */
