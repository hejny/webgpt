import emoji1F680 from 'openmoji/color/svg/1F680.svg';
import emoji1F92F from 'openmoji/color/svg/1F92F.svg';

type EmojiMap = { [emoji: string]: string };

const EMOJI_MAP: EmojiMap = {
    '🚀': emoji1F680.src,
    '🤯': emoji1F92F.src,
};

/**
 * Replaces emojis in an html with images from openmoji
 */
export function emojifyHtml(html: string): string {
    for (const [emoji, src] of Object.entries(EMOJI_MAP)) {
        html = html.split(emoji).join(`<img src="${src}" alt="${emoji}" class="emoji"/>`);
    }

    return html;
}
