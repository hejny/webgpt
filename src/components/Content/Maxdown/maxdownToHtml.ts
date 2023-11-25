import spaceTrim from 'spacetrim';
import type { string_html, string_maxdown } from '../../../utils/typeAliases';

export function maxdownToHtml(content: string_maxdown): string_html {
    let enhancedContent: string_maxdown = spaceTrim(content || '');

    enhancedContent = linkMaxdown(enhancedContent);
    enhancedContent = normalizeDashes(enhancedContent);

    let html = maxdownConverter.makeHtml(enhancedContent);

    if (isusingFonts) {
        html = html.replace(
            // TODO: [🔤] DRY
            /<!--font:(.*?)-->/g,

            // Note: [💅] Originally here was '$1' but it was changed just to $1 (unquoted)
            //       There is some problem with escaping in export:
            //       - <div style="font-family:&#x27;Barlow Condensed&#x27;, sans-serif">
            `</div><div style="font-family: $1, sans-serif;">` /* <- TODO: Do not hardcode sans-serif */ /* <- [🎗] */,
        );
        // TODO: Teoretically, the line below should be used BUT it does not work with it and strangely works without it:
        // synchronouslyEnhancedContent = `<div>\n\n\n${synchronouslyEnhancedContent}\n\n\n</div>` /* <- TODO: This is a bit hack how to process easily non-ended font tags  */;
    }

    html = html.split(/<p>\s*<\/p>/g).join('');

    return html;
}

/**
 * !!! Annotate
 */
