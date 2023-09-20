import type { string_html, string_markdown } from '../typeAliases';
import { removeContentComments } from './removeContentComments';

export function detectContentFormat(content: string_html | string_markdown | string): 'html' | 'markdown' | 'text' {
    const originalContent = content;
    content = removeContentComments(content);

    // Note: Walking line by line to prioritize what is at the top of the content
    for (const line of content.split('\n')) {
        // Check if the content contains HTML tags
        // A simple regex to match any tag: <[^>]+>
        // Note: this is not a robust way to parse HTML, but it works for this purpose
        if (/<[^>]+>/.test(line)) {
            return 'html';
        }

        // Check if the content contains markdown syntax
        // A simple regex to match some common markdown elements: #, *, **, \, etc.
        // Note: this is not a complete markdown parser, but it works for this purpose
        if (/(#|\*{1,2}|\\)/.test(line)) {
            return 'markdown';
        }
    }

    if (content !== originalContent) {
        // Original content contained comments and no other marks, assume it is HTML
        return 'html';
    }

    // If none of the above conditions are met, assume the content is plain text
    return 'text';
}
