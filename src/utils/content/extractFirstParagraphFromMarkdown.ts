import spaceTrim from 'spacetrim';
import { string_markdown } from '../typeAliases';

/**
 * Extracts the first paragraph from a markdown string.
 *
 * @param {string} str - The markdown string to extract paragraph from.
 * @returns {string} The first paragraph of the markdown string.
 */
export function extractFirstParagraphFromMarkdown(str: string_markdown): string {
    const paragraphs = spaceTrim(str).split('\n\n');
    return paragraphs[1] || paragraphs[0]!;
}
