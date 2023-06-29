import { normalizeToKebabCase } from 'n12';
import { IWallpaper } from './IWallpaper';
import { randomString } from './randomString';
import { string_uriid } from './typeAliases';

export function computeWallpaperUriid(wallpaper: IWallpaper): string_uriid {
    const words = normalizeToKebabCase(wallpaper.title).split('-').join();

    let nameParts: Array<string> = [];
    for (const word of words) {
        if (nameParts.length === 0) {
            nameParts.push(word);
        } else {
            const potentialTotalLength = [...nameParts, word].join('-').length;

            if (potentialTotalLength > 30) {
                break;
            }
        }
    }

    /**
     * All chars are:
     * 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
     * But we are using Base58 to prevent misspelling!
     *
     * 11 chars are on YouTube
     *
     */
    const sitePart = randomString(1, '234567') + randomString(10, 'abcdefghijklmnopqrstuvwxyz234567');

    const versionPart = randomString(3, 'abcdefghijklmnopqrstuvwxyz234567');

    return `${nameParts.join('-')}-${sitePart}-${versionPart}`;
}
