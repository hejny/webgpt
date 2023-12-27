import { string_email } from '../typeAliases';
import { isValidEmail } from '../validators/isValidEmail';

/**
 * Provides client email if it's in localStorage
 *
 * Note: This function is available only in browser
 *
 * @returns clientId
 */
export function $provideClientEmail(): string_email | null {
    const clientEmail = window.localStorage.getItem(`clientEmail`);

    if (clientEmail && !isValidEmail(clientEmail)) {
        window.localStorage.removeItem(`clientEmail`);
        // Note: It make sense to log this error because it is captured by Sentry
        throw new Error(`Invalid clientEmail in localStorage "${clientEmail}"`);
        //             <- TODO: ShouldNeverHappenError
    }

    return clientEmail;
}

/**
 * TODO: [🧠] Maybe suffix "ForBrowser"
 * TODO: [🌯] Maybe read email from the the server
 */
