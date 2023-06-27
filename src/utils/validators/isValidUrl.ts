import { string_url } from './typeAliases';

/**
 * Tests if given string is valid URL.
 *
 * Note: Dataurl are considered perfectly valid.
 *
 * @collboard-modules-sdk
 */
export function isValidUrl(url: string_url): boolean {
    try {
        const urlObject = new URL(url);

        if (!['http:', 'https:', 'data:'].includes(urlObject.protocol)) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}
