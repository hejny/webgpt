import { string_email } from '../typeAliases';
import { isValidEmail } from '../validators/isValidEmail';

/**
 * Backup client email if it's in localStorage
 * - It is redundant place to prefill the forms and to be compliant with GDPR
 * - It also allows to quickresolve <ClientVerificationComponent/>
 *
 * Note: This function is available only in browser
 *
 * @returns clientId
 */
export function $backupClientEmail(clientEmail: string_email) {
    if (!isValidEmail(clientEmail)) {
        throw new Error(`Can not backup invalid email "${clientEmail}"`);
    }
    window.localStorage.setItem(`clientEmail`, clientEmail);
}

/**
 * TODO: [🧠] Maybe suffix "ForBrowser"
 * TODO: [🌯] Maybe read email from the the server
 */
