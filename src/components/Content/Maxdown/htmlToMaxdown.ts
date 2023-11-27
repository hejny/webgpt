import spaceTrim from 'spacetrim';
import type { string_html, string_maxdown } from '../../../utils/typeAliases';
import { markdownConverter } from '../markdownConverter';
import { validateMaxdown } from './validateMaxdown';

export function htmlToMaxdown(htmlContent: string_html): string_maxdown {
    const containerElement = document.createElement('div');
    containerElement.innerHTML = htmlContent;

    let markdownContent = '';

    for (const childNode of Array.from(containerElement.childNodes)) {
        if (childNode instanceof HTMLElement) {
            let font = childNode.style.fontFamily;

            if (font) {
                font = font.split(',')[0]!.trim();

                markdownContent += `<!--font:${font}-->\n\n`;
            }

            markdownContent += markdownConverter.makeMarkdown(childNode.innerHTML);
        } else if (childNode instanceof Text) {
            if (spaceTrim(childNode.textContent || '') !== '') {
                throw new Error(
                    spaceTrim(
                        (block) => `
                            Only HTML elements are allowed on top level

                            Found non-empty text node
                            Content: ${block(childNode.textContent!)}
                        `,
                    ),
                );
            }
            //markdownContent += childNode.textContent!;
        } else {
            throw new Error(
                spaceTrim(
                    (block) => `
                    Only HTML elements are allowed on top level

                    Found nodeName ${block(childNode.nodeName)}
                    Found nodeType ${block(childNode.nodeType.toString())}
                    @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
                `,
                ),
            );
        }
    }

    return validateMaxdown(markdownContent);
}

/**
 * !!! Annotate
 */
