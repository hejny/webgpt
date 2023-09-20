import { spaceTrim } from 'spacetrim';
import { string_markdown } from '../typeAliases';

/**
 * Remove the title from a markdown string.
 */
export function removeMarkdownTitle(content: string_markdown): string_markdown {
    const lines = content.split('\n');
    const firstLine = lines[0]!;
    const firstLineIsTitle = firstLine.startsWith('# ');
    if (firstLineIsTitle) {
        lines.shift();
        return spaceTrim(lines.join('\n'));
    } else {
        return spaceTrim(content);
    }
}
