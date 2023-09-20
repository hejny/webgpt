import { spaceTrim } from 'spacetrim';
import { detectContentFormat } from '../../utils/content/detectContentFormat';
import { string_font_family, string_html, string_markdown } from '../../utils/typeAliases';

export function addFontToContent<TContent extends string_markdown | string_html>(
    content: TContent,
    font: string_font_family,
): TContent {
    const contentFormat = detectContentFormat(content);

    if (contentFormat === 'markdown') {
        return spaceTrim(
            (block) => `
            
                <!--font:${font}-->

                ${block(content)}

            `,
        ) as TContent;
    } else if (contentFormat === 'html') {
        return spaceTrim(
            (block) => `
            
                <div style="font-family:${font /* <- Note: [💅] */}">

                    ${block(content)}

                </div>

            `,
        ) as TContent;
    } else if (contentFormat === 'text') {
        throw new Error('Cannot add font to text content');
    }

    throw new Error('Unknown content format');
}
