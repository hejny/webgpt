import spaceTrim from 'spacetrim';
import { prettifyHtml } from '../../../export/utils/prettifyHtml';
import type { string_html, string_maxdown } from '../../../utils/typeAliases';
import { markdownConverter } from '../markdownConverter';
import { validateMaxdown } from './validateMaxdown';

/**
 * Parses edited HTML content into maxdown
 * It is useful for editing in WYSIWYG style
 *
 * @param htmlContent the HTML content to parse
 * @returns the pretty maxdown content
 */
export function htmlToMaxdown(htmlContent: string_html): string_maxdown {
    htmlContent = spaceTrim(htmlContent || '' /* <- TODO: [👧 */);

    if (!htmlContent.startsWith('<div')) {
        htmlContent = `<div>${htmlContent}</div>`;
    }

    const containerElement = document.createElement('div');
    containerElement.innerHTML = htmlContent;

    let markdownContent = '';

    for (const childNode of Array.from(containerElement.childNodes)) {
        if (childNode instanceof HTMLElement) {
            let font = childNode.style.fontFamily;

            if (font) {
                font = font.split(',')[0]!.trim();

                if (markdownContent !== '') {
                    markdownContent += '\n';
                }

                markdownContent += `<!--font:${font}-->\n\n`;
            }

            let nodeHtml = childNode.innerHTML;
            let nodeMarkdown = markdownConverter.makeMarkdown(nodeHtml);

            nodeMarkdown = nodeMarkdown
                .split('\n')
                .map((line) => {
                    if (line.startsWith('<') && line.endsWith('>')) {
                        //       <- TODO: Better detection of HTML content in maxdown
                        return prettifyHtml(line);
                    }

                    return line;
                })
                .join('\n');

            if (nodeMarkdown.endsWith('\n\n')) {
                nodeMarkdown = nodeMarkdown.slice(0, -1);
            }

            markdownContent += nodeMarkdown;
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

    if (markdownContent.endsWith('\n\n')) {
        markdownContent = markdownContent.slice(0, -1);
    }

    return validateMaxdown(markdownContent);
}
