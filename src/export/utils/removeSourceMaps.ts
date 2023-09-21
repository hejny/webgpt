import type { string_css, string_javascript } from '../../utils/typeAliases';

/**
 * Remove source maps from the code
 *
 * @param source with source maps
 */
export function removeSourceMaps(source: string_css | string_javascript): string {
    return source.split(/\/\*#\s*sourceMappingURL=[^*]+\*\//g).join('');
}
