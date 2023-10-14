import { nameToUriParts } from 'n12';
import { extractTitleFromContent } from './content/extractTitleFromContent';
import { string_html, string_markdown, string_uriid } from './typeAliases';

export function computeWallpaperDomainPart(wallpaperContent: string_markdown | string_html): string_uriid {
    let title = extractTitleFromContent(wallpaperContent) || '';

    // Note: Ignore apostrophes and quotes in name to make URL
    title = title.split("'").join('');
    title = title.split('"').join('');
    title = title.split('`').join('');
    title = title.split('’').join('');

    const allUriParts = nameToUriParts(title);

    let uriParts: Array<string> = [];
    for (const uriPart of allUriParts) {
        if (uriParts.length === 0) {
            uriParts.push(uriPart);
        } else {
            const potentialTotalLength = [...uriParts, uriPart].join('-').length;

            if (potentialTotalLength > 30) {
                break;
            }

            uriParts.push(uriPart);
        }
    }

    if (uriParts.length === 0) {
        return 'untitled';
    }

    return uriParts.join('-');
}
