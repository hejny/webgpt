import { isRunningInBrowser, isRunningInWebWorker } from '../isRunningInWhatever';
import type { IsClientVerifiedRequest, IsClientVerifiedResult } from './isClientVerified.types';

/**
 * Function isClientVerified checks if client has verified email
 *
 * Note: This function has version both for browser and server
 */
export async function $isClientVerifiedForBrowser(options: IsClientVerifiedRequest): Promise<IsClientVerifiedResult> {
    if (!isRunningInBrowser() && !isRunningInWebWorker()) {
        throw new Error(
            'Function `$isClientVerifiedForBrowser` can not be used on server, use server version instead.',
        );
    }

    const response = await fetch(`/api/client/is-client-verified`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    });
    const result = (await response.json()) as IsClientVerifiedResult;
    return result;
}
