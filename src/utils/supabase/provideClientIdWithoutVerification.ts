import { isRunningInBrowser } from '../isRunningInWhatever';
import { randomUuid } from '../randomUuid';
import { uuid } from '../typeAliases';

/**
 * Internal cache for provideClientIdWithoutVerification
 * @private
 * @singleton
 */
let clientId: uuid | null = null;

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

    // TODO: Use here isValidUuid

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
