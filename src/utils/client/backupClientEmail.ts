import { string_email } from '../typeAliases';

/**
 * Backup client email if it's in localStorage
 * - It is redundant place to prefill the forms and to be compliant with GDPR
 * - It also allows to quickresolve <ClientVerificationComponent/>
 *
 * Note: This function is available only in browser
 *
 * @returns clientId
 */
export function $backupClientEmail(email: string_email) {
    window.localStorage.setItem(`clientEmail`, email);
}

/**
 * TODO: !!! Rename to ForBrowser
 * TODO: [🌯] Maybe read email from the the server
 */
