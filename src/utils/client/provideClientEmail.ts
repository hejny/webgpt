import { string_email } from '../typeAliases';

/**
 * Provides client email if it's in localStorage
 *
 * Note: This function is available only in browser
 *
 * @returns clientId
 */
export function $provideClientEmail(): string_email | null {
    const clientEmail = window.localStorage.getItem(`clientEmail`);
    return clientEmail;
}

/**
 * TODO: !!! Rename to ForBrowser
 * TODO: [🌯] Maybe read email from the the server
 */
