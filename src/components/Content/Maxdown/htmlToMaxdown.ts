import spaceTrim from 'spacetrim';
import type { string_html, string_maxdown } from '../../../utils/typeAliases';
import { markdownConverter } from '../markdownConverter';
import { validateMaxdown } from './validateMaxdown';

export function htmlToMaxdown(htmlContent: string_html): string_maxdown {
    const containerElement = document.createElement('div');
    containerElement.innerHTML = htmlContent;

    let markdownContent = '';

    for (const childNode of Array.from(containerElement.childNodes)) {
        if (!(childNode instanceof HTMLElement)) {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Only HTML elements are allowed

                        Found: ${block(childNode.nodeType)}
                    `,
                ),
            );
        }

        let font = childNode.style.fontFamily;

        if (font) {
            font = font.split(',')[0]!.trim();

            markdownContent += `<!--font:${font}-->\n\n`;
        }

        markdownContent += markdownConverter.makeMarkdown(childNode.innerHTML);
    }

    return validateMaxdown(markdownContent);
}

/**
 * !!! Annotate
 */
