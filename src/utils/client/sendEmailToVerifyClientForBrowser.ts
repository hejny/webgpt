import { isRunningInBrowser, isRunningInWebWorker } from '../isRunningInWhatever';
import type { SendEmailToVerifyClientRequest, SendEmailToVerifyClientResult } from './sendEmailToVerifyClient.types';

/**
 * Function sendEmailToVerifyClient will generate a verification code, saves it into a DB and send it to the email
 *
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
