import { string_font_family, string_html, string_markdown } from '../../utils/typeAliases';
import { addFontToContent } from './addFontToContent';
import { extractFontsFromContent } from './extractFontsFromContent';

/**
 * Replaces all fonts in the content with the new font
 *
 * @param content content to change fonts in
 * @param newFont new font to use
 * @returns same content with changed fonts
 */
export function changeFontsInContent<TContent extends string_markdown | string_html>(
    content: TContent,
    newFont: string_font_family,
): TContent {
    const oldFonts = extractFontsFromContent(content);

    if (oldFonts.size === 0) {
        return addFontToContent(content, newFont);
    }

    for (const oldFont of Array.from(oldFonts)) {
        content = content.split(oldFont).join(newFont) as TContent;
    }

    return content;
}

/**
 * TODO: Do not be confused by old font name in the content or comments - DO NOT CHANGE IT (+test)
 * TODO: Allow to change multiple fonts at once preserving the order (+test)
 */
