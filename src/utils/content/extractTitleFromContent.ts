import { markdownConverter } from '../../components/MarkdownContent/markdownConverter';
import { string_html, string_markdown, string_title } from '../typeAliases';
import { detectContentFormat } from './detectContentFormat';
import { extractTitleFromHtml } from './extractTitleFromHtml';

export function extractTitleFromContent(content: string_markdown | string_html): string_title | null {
    const format = detectContentFormat(content);

    if (format === 'text') {
        return content;
    }

    if (format === 'markdown') {
        content = markdownConverter.makeHtml(content);
    }

    return extractTitleFromHtml(content);
}
