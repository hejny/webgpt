import { isRunningInBrowser, isRunningInWebWorker } from '../isRunningInWhatever';
import type { SendEmailToVerifyClientRequest, SendEmailToVerifyClientResult } from './sendEmailToVerifyClient.types';

/**
 * Function sendEmailToVerifyClientForBrowser sends verification request to the server
 *
 * Note: This function internally checks if client is already verified, if yes, it will return ALREADY_VERIFIED
 * Note: This function has version both for browser and server
 */
export async function $sendEmailToVerifyClientForBrowser(
    options: SendEmailToVerifyClientRequest,
): Promise<SendEmailToVerifyClientResult> {
    if (!isRunningInBrowser() && !isRunningInWebWorker()) {
        throw new Error(
            'Function `$sendEmailToVerifyClientForBrowser` can not be used on server, use server version instead.',
        );
    }

    const response = await fetch(`/api/client/send-email-to-verify-client`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    });
    const result = (await response.json()) as SendEmailToVerifyClientResult;
    return result;
}
