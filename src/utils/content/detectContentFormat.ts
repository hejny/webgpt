import { string_html, string_markdown } from '../typeAliases';
import { removeContentComments } from './removeContentComments';

export function detectContentFormat(content: string_html | string_markdown | string): 'html' | 'markdown' | 'text' {
    content = removeContentComments(content);

    // check if the content starts with a valid HTML tag
    const htmlRegex = /<([a-z0-9]+).*>(.*)<\/\1>/is;
    if (htmlRegex.test(content)) {
        return 'html';
    }
    // check if the content contains any markdown syntax
    const markdownRegex = /([*_~`]|^#{1,6}\s|\n\s*[-+*]\s|\n\s*>|\n\s*```|\n\s*\|)/;
    if (markdownRegex.test(content)) {
        return 'markdown';
    }

    // otherwise, assume it is plain text
    return 'text';
}
