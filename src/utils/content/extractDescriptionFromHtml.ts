import spaceTrim from 'spacetrim';
import { DOMParser } from 'xmldom-qsa';
import { description, string_html } from '../typeAliases';

/**
 * Extract the first paragraph from HTML
 *
 * @param contentText HTML
 * @returns heading
 */
export function extractDescriptionFromHtml(contentHtml: string_html): Exclude<description, JSX.Element>  | null {
    contentHtml = contentHtml.split(/\s+/gs).join(' ');
    contentHtml = contentHtml.split(/\<(?:br|hr)\s*\/?\>/gis).join('\n');
    contentHtml = contentHtml.split(/\<(?:wbr)\s*\/?\>/gis).join(' ');

    const parser = new DOMParser();
    const document = parser.parseFromString(
        spaceTrim(`
            <content-to-extract>
                ${contentHtml}
            </content-to-extract>
        `),
        'text/html',
    );

    let description = document.querySelector('p')?.textContent;

    if (!description) {
        return null;
    }

    description = description
        .split(String.fromCharCode(160))
        .join(' ' /* <- Note: This replace hard spaces into soft ones */);
    description = spaceTrim(description);
    return description;
}

/**
 * TODO: [🎚] Maybe use jsdom (or other parser/polyfill) instead of xmldom-qsa
 *       This brings quite a lot of bundle size with it
 */
