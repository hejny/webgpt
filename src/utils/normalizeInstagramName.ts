import { isValidUrl } from './validators/isValidUrl';

const EXCLUDED_WORDS = ['H-edu'];

/**
 * Normalize Instagram name or URL to the name.
 *
 * Examples:
 * - michelangelato.zmrzlinarna -> michelangelato.zmrzlinarna
 * - @michelangelato.zmrzlinarna -> michelangelato.zmrzlinarna
 * - https://www.instagram.com/michelangelato.zmrzlinarna/ -> michelangelato.zmrzlinarna
 * - https://www.instagram.com/michelangelato.zmrzlinarna/?whatever=foo#bar -> michelangelato.zmrzlinarna
 */
export function normalizeInstagramName(instagramNameOrUrl: string): string {
    if (instagramNameOrUrl.startsWith('@')) {
        return instagramNameOrUrl.slice(1);
    } else if (isValidUrl(instagramNameOrUrl)) {
        const url = new URL(instagramNameOrUrl);
        const pathSegments = url.pathname.split('/');
        return pathSegments[1] || pathSegments[0]!;
    } else {
        return instagramNameOrUrl;
    }
}
