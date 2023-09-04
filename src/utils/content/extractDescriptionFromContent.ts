import { markdownConverter } from '../../components/MarkdownContent/markdownConverter';
import { description, string_html, string_markdown } from '../typeAliases';
import { detectContentFormat } from './detectContentFormat';
import { extractDescriptionFromHtml } from './extractDescriptionFromHtml';

export function extractDescriptionFromContent(content: string_markdown | string_html): description | null {
    const format = detectContentFormat(content);

    if (format === 'text') {
        return content;
    }

    if (format === 'markdown') {
        content = markdownConverter.makeHtml(content);
    }

    return extractDescriptionFromHtml(content);
}
