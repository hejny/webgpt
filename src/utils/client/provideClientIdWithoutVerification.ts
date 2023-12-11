import { isRunningInBrowser } from '../isRunningInWhatever';
import { randomUuid } from '../randomUuid';
import { client_id, uuid } from '../typeAliases';
import { isValidClientId } from '../validators/isValidClientId';

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
export function provideClientIdWithoutVerification(): uuid {
    if (!isRunningInBrowser()) {
        throw new Error(`provideClientId is available only in browser`);
    }

    if (clientId) {
        return clientId;
    }

    clientId = window.localStorage.getItem(`clientId`) as uuid;

    if (!isValidClientId(clientId)) {
        // Note: It make sense to log this error because it is captured by Sentry
        console.error(`Invalid clientId in localStorage "${clientId}"`);
    }

    if (clientId) {
        return clientId;
    }

    clientId = randomUuid();
    window.localStorage.setItem(`clientId`, clientId as uuid);

    return clientId as uuid;
}

/**
 * TODO: [🧠] This should be probbably in some other folder than supabase
 */
