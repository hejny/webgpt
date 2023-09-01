import { nameToUriParts } from 'n12';
import seedrandom from 'seedrandom';
import { extractTitleFromContent } from './content/extractTitleFromContent';
import { serializeColorStats } from './image/utils/serializeColorStats';
import { IWallpaper } from './IWallpaper';
import { randomString } from './randomString';
import { string_uriid } from './typeAliases';

const URIID_VERSION = '2';

export function computeWallpaperUriid(
    wallpaper: Omit<IWallpaper, 'id' | 'title' | 'keywords' | 'saveStage' | 'isPublic'>,
): string_uriid {
    // console.log('wallpaper.content', wallpaper.content);
    // (window as any).copy(wallpaper.content);

    let title = extractTitleFromContent(wallpaper.content) || '';

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
     */
    const wallpaperPart =
        URIID_VERSION +
        randomString(1, 'abcdefghijklmnopqrstuvwxyz') +
        randomString(10, 'abcdefghijklmnopqrstuvwxyz234567');

    console.info('computeWallpaperUriid', {
        URIID_VERSION,
        wallpaper,
        wallpaperContent: wallpaper.content,
        title,
        allUriParts,
        uriParts,
        seed,
        wallpaperPart,
    });

    return `${uriParts.length === 0 ? '' : uriParts.join('-') + '-'}${wallpaperPart}`;
}

/**
 * TODO: Download src and put in hash real pixel-content of the image
 */
