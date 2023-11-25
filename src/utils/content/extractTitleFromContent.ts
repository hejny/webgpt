import { markdownConverter } from '../../components/Content/markdownConverter';
import { string_html, string_markdown, string_maxdown, title } from '../typeAliases';
import { detectContentFormat } from './detectContentFormat';
import { extractTitleFromHtml } from './extractTitleFromHtml';

export function extractTitleFromContent(content: string_maxdown): Exclude<title, JSX.Element> | null {
    const format = detectContentFormat(content);

    if (format === 'text') {
        // Note: Pure text content does not have a title
        return null;
    }

    if (format === 'markdown') {
        content = markdownConverter.makeHtml(content);
    }

    return extractTitleFromHtml(content);
}
