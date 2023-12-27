import type { string_font_family, string_html, string_markdown, string_maxdown } from '../../utils/typeAliases';

/**
 * A function that takes a string as input and returns a set of fonts extracted from it
 */
export function extractFontsFromContent(
    content: string_markdown | string_maxdown | string_html,
): Set<string_font_family> {
    // The set to store extracted fonts
    let fonts = new Set<string>();

    // Regular expressions for matching fonts in CSS/HTML
    const htmlFontRegex = /font-family:\s*(['"]?)([^'";]+)\1/gi;
    // Regular expressions for matching fonts in maxdown
    const maxdownFontRegex = /<!--font:\s*(['"]?)([^'">\n]+)\1\s*-->/gi;

    // Match and process all font-family usages in CSS/HTML
    let match;
    while ((match = htmlFontRegex.exec(content))) {
        let font = match[2]!.trim();
        // In case of multiple fonts (fallbacks), split by comma and take the first one
        font = font.split(',')[0]!.trim();
        fonts.add(font);
    }

    // Match and process all font-family usages in maxdown
    while ((match = maxdownFontRegex.exec(content))) {
        let font = match[2]!.trim();
        fonts.add(font);
    }

    return fonts;
}

/**
 * TODO: Use here named capture groups
 */
