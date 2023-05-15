const EXCLUDED_WORDS = ['H-edu'];

/**
 * Extract title from markdown
 *
 * @param contentText markdown
 * @returns title
 */
export function extractTitleFromMarkdown(contentText: string): string |null{
    return contentText.match(/^#\s*(?<title>.*)\s*$/m)?.groups?.title ??
    null; 
}
