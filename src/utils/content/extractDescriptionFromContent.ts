import { markdownConverter } from '../../components/MarkdownContent/markdownConverter';
import { string_description, string_html, string_markdown } from '../typeAliases';
import { detectContentFormat } from './detectContentFormat';
import { extractDescriptionFromHtml } from './extractDescriptionFromHtml';

export function extractDescriptionFromContent(content: string_markdown | string_html): string_description | null {
    const format = detectContentFormat(content);

    if (format === 'markdown') {
        content = markdownConverter.makeHtml(content);
    }

    return extractDescriptionFromHtml(content);
}
