import { normalizeToKebabCase } from 'n12';
import seedrandom from 'seedrandom';
import { extractTitleFromContent } from './content/extractTitleFromContent';
import { serializeColorStats } from './image/utils/serializeColorStats';
import { IWallpaper } from './IWallpaper';
import { randomString } from './randomString';
import { string_uriid } from './typeAliases';

const URIID_VERSION = '2';

export function computeWallpaperUriid(
    wallpaper: Omit<IWallpaper, 'id' | 'title' | 'keywords' | 'isSaved' | 'isPublic'>,
): string_uriid {
    const title = extractTitleFromContent(wallpaper.content) || '';
    const words = normalizeToKebabCase(title.toLocaleLowerCase()).split('-');

    let nameParts: Array<string> = [];
    for (const word of words) {
        if (nameParts.length === 0) {
            nameParts.push(word);
        } else {
            const potentialTotalLength = [...nameParts, word].join('-').length;

            if (potentialTotalLength > 30) {
                break;
            }

            nameParts.push(word);
        }
    }

    const { parent, author, src, prompt, colorStats, content } = wallpaper;

    // TODO: Test here that all fields are present (into the future)

    const seed = JSON.stringify({
        parent,
        author,
        src,
        prompt,
        colorStats: serializeColorStats(colorStats),
        content,
    });

    seedrandom(seed, { global: true /* <- TODO: Some way how to unset this */ });

    /**
     * All chars are:
     * 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
     * But we are using Base58 to prevent misspelling!
     *
     * 11 chars are on YouTube
     *
     */
    const wallpaperPart =
        URIID_VERSION +
        randomString(1, 'abcdefghijklmnopqrstuvwxyz') +
        randomString(10, 'abcdefghijklmnopqrstuvwxyz234567');

    return `${nameParts.join('-')}-${wallpaperPart}`;
}

/**
 * TODO: Download src and put in hash real pixel-content of the image
 */
