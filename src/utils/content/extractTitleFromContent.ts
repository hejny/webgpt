import { string_html, string_markdown, string_title } from '../typeAliases';
import { detectContentFormat } from './detectContentFormat';
import { extractTitleFromHtml } from './extractTitleFromHtml';
import { extractTitleFromMarkdown } from './extractTitleFromMarkdown';

export function extractTitleFromContent(content: string_markdown | string_html): string_title | null {
    const format = detectContentFormat(content);

    switch (format) {
        case 'markdown':
            return extractTitleFromMarkdown(content);

        case 'html':
            return extractTitleFromHtml(content);

        default:
            return null;
    }
}
