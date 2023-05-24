import { EMOJIS } from '../emojis';
import { string_url } from '../typeAliases';

/**
 * Replaces emojis in an html with images from openmoji
 */
export async function emojifyMarkdown(
    html: string,
    type: 'black' | 'color' /* <- TODO: Add here white and negative AND use negative */,
): Promise<string> {
    // console.log('-----------');
    for (const emoji of EMOJIS) {
        if (!html.includes(emoji)) {
            continue;
        }
        const codePoint = emoji.codePointAt(0);

        if (!codePoint) {
            console.warn(`⚠️ Emoji ${emoji} has no code point`);
            continue;
        }

        const code = codePoint.toString(16).toUpperCase();
        const image = await import(`openmoji/${type}/svg/${code}.svg`)
            .then((module) => module.default as { src: string_url; width: number; height: number })
            .catch(() => null);

        if (image === null) {
            console.warn(`⚠️ Emoji ${emoji} is not in Openmoji`);
            continue;
        }

        const { src, width, height } = image;

        // console.log('----');
        // console.log(html);
        html = html.split(emoji).join(`<img src="${src}" alt="${emoji}" class="emoji"/>`);
        // console.log(html);
    }

    return html;
}

/**
 * TODO: [1] We should take emojis ONLY in text NOT in code,alt,links,etc
 * TODO: But maybe implement [1] as emojifyHtml if simpler
 * TODO: !!! Cache the emoji imports
 * !!!! Must work with SSR - maybe fallback to keep
 */
