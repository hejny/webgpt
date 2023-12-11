import { isRunningInBrowser } from '../isRunningInWhatever';
import { client_id } from '../typeAliases';
import { isValidClientId } from '../validators/isValidClientId';
import { $generateClientId } from './generateClientId';
import { validateClientId } from './validateClientId';

/**
 * Internal cache for provideClientIdWithoutVerification
 * @private
 * @singleton
 */
let clientId: client_id | null = null;

/**
 * Gets clientId from localStorage or generates new one
 *
 * Note: Consider using provideClientId instead which also verifies email
 * Note: This function is available only in browser
 *
 * @returns clientId
 */
export function $provideClientIdWithoutVerification(): client_id {
    if (!isRunningInBrowser()) {
        throw new Error(`provideClientId is available only in browser`);
    }

    if (clientId) {
        return clientId;
    }

    clientId = validateClientId(window.localStorage.getItem(`clientId`));

    if (!isValidClientId(clientId)) {
        // Note: It make sense to log this error because it is captured by Sentry
        console.error(`Invalid clientId in localStorage "${clientId}"`);
    }

    if (clientId) {
        return clientId;
    }

    clientId = $generateClientId();
    window.localStorage.setItem(`clientId`, clientId);

    return clientId;
}
