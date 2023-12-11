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

    let clientIdInLocalStorage = window.localStorage.getItem(`clientId`);

    clientId = clientIdInLocalStorage === null ? null : validateClientId(clientIdInLocalStorage);

    if (clientId && !isValidClientId(clientId)) {
        window.localStorage.removeItem(`clientId`);
        // Note: It make sense to log this error because it is captured by Sentry
        throw new Error(`Invalid clientId in localStorage "${clientId}"`);
        //             <- TODO: ShouldNeverHappenError
    }

    if (clientId) {
        return clientId;
    }

    clientId = $generateClientId();
    window.localStorage.setItem(`clientId`, clientId);

    return clientId;
}
