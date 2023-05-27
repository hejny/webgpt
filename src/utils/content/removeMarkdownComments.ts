import { string_markdown } from "../typeAliases";

/**
 * Removes Markdown comments from a string.
 *
 * @param {string} str - The string to remove Markdown comments from.
 * @returns {string} The input string with all Markdown comments removed.
 */
export function removeMarkdownComments(str: string_markdown): string_markdown {
    // Use regular expressions to remove Markdown comments from the string
    return str.replace(/<!--(.*?)-->/gs, '');
}
