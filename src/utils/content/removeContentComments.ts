import { spaceTrim } from 'spacetrim';
import type { string_html, string_markdown } from '../typeAliases';

/**
 * Removes HTML or Markdown comments from a string.
 *
 * @param {string} content - The string to remove comments from.
 * @returns {string} The input string with all comments removed.
 */
export function removeContentComments<TContent extends string_html | string_markdown>(content: TContent): TContent {
    return spaceTrim(content.replaceAll(/<!--(.*?)-->/gis, '')) as TContent;
}
