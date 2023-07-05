import { string_markdown, string_title } from '../typeAliases';
import { removeMarkdownComments } from './removeMarkdownComments';

/**
 * Extract title from markdown
 *
 * @param contentMarkdown markdown
 * @returns title
 */
export function extractTitleFromMarkdown(contentMarkdown: string_markdown): string_title | null {
    contentMarkdown = removeMarkdownComments(contentMarkdown);
    return contentMarkdown.match(/^#\s*(?<title>.*)\s*$/m)?.groups?.title ?? null;
}
