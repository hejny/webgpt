import { normalizeToKebabCase } from 'n12';
import seedrandom from 'seedrandom';
import { serializeColorStats } from './image/utils/serializeColorStats';
import { IWallpaper } from './IWallpaper';
import { randomString } from './randomString';
import { string_uriid } from './typeAliases';

const URIID_VERSION = '1';

export function computeWallpaperUriid(wallpaper: Omit<IWallpaper, 'id'>): string_uriid {
    const words = normalizeToKebabCase(wallpaper.title).split('-');

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

    const {
        // TODO: Download src and put in hash real pixel-content of the image
        colorStats,
    } = wallpaper;

    const seed = JSON.stringify({ ...wallpaper, colorStats: serializeColorStats(colorStats) });
    console.log('seed', seed);

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
