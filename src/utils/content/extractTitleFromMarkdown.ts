import { string_title } from '../typeAliases';
import { removeMarkdownComments } from './removeMarkdownComments';

/**
 * Extract title from markdown
 *
 * @param contentText markdown
 * @returns title
 */
export function extractTitleFromMarkdown(contentText: string): string_title | null {
    contentText = removeMarkdownComments(contentText);
    return contentText.match(/^#\s*(?<title>.*)\s*$/m)?.groups?.title ?? null;
}
