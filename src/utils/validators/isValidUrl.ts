import { string_url } from '../typeAliases';

/**
 * Tests if given string is valid URL.
 *
 * Note: Dataurl are considered perfectly valid.
 */
export function isValidUrl(url: unknown): url is string_url {
    try {
        const urlObject = new URL(url as any);

        if (!['http:', 'https:', 'data:'].includes(urlObject.protocol)) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}
