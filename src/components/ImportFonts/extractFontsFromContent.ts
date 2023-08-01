import { string_font, string_html, string_markdown } from '../../utils/typeAliases';

/**
 * A function that takes a string as input and returns a set of fonts extracted from it
 */
export function extractFontsFromContent(content: string_markdown | string_html): Set<string_font> {
    // Initialize an empty set to store the fonts
    let fonts = new Set<string_font>();

    content = content.replace(
        // TODO: [🔤] DRY
        /<!--font:(.*?)-->/g,
        `</div><div style="font-family: '$1';">`,
    );

    // Define a regular expression to match the font-family property in the style attribute
    let regex = /font-family:\s*(['"]?)([^;,'"]+)\1/g;

    // Loop through all the matches in the content
    while (true) {
        // Get the next match
        let match = regex.exec(content);

        // If there is no more match, break the loop
        if (match == null) {
            break;
        }

        // Get the second capture group, which is the font name
        let font = match[2];

        // If the font name contains a comma, it means there are multiple fonts specified
        // In that case, we only take the first one, which is the preferred font
        if (font.includes(',')) {
            font = font.split(',')[0].trim();
        }

        // Add the font to the set, removing any quotes around it
        fonts.add(font.replace(/['"]/g, '') as string_font);
    }

    // Return the set of fonts
    return fonts;
}
