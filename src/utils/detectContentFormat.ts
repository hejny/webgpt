import { string_html, string_markdown } from './typeAliases';

export function detectContentFormat(content: string_markdown | string_html): 'markdown' | 'html' {
    // check if the content starts with a valid HTML tag
    const htmlRegex = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/i;
    if (htmlRegex.test(content)) {
        return 'html';
    }
    // check if the content contains any markdown syntax
    const markdownRegex = /([*_~`]|^#{1,6}\s|\n\s*[-+*]\s|\n\s*>|\n\s*```|\n\s*\|)/;
    if (markdownRegex.test(content)) {
        return 'markdown';
    }
    // otherwise, assume it is plain text
    return 'markdown';
}
