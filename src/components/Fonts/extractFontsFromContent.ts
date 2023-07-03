import { string_font, string_html, string_markdown } from '../../utils/typeAliases';

export function extractFontsFromContent(content: string_markdown | string_html): Set<string_font> {
    const fonts = new Set<string_font>();

    Array.from(content.matchAll(/font(-family)?:\s*?['"]?([^'"]+)['"]?/g)).forEach((match) => {
        fonts.add(match[1] as string_font);
    });

    return fonts;
}
