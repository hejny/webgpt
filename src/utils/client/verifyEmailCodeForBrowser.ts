import { isRunningInBrowser, isRunningInWebWorker } from '../isRunningInWhatever';
import type { VerifyEmailCodeRequest, VerifyEmailCodeResult } from './verifyEmailCode.types';

/**
 * Function verifyEmailCodeForBrowser sends verification code to the server and checks if it is correct
 *
 * Note: This function has version both for browser and server
 */
export async function $verifyEmailCodeForBrowser(options: VerifyEmailCodeRequest): Promise<VerifyEmailCodeResult> {
    if (!isRunningInBrowser() && !isRunningInWebWorker()) {
        throw new Error('Function `$verifyEmailCodeForBrowser` can not be used on server, use server version instead.');
    }

    const response = await fetch(`/api/client/send-email-to-verify-client`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    });
    const result = (await response.json()) as VerifyEmailCodeResult;
    return result;
}
