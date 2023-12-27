import { string_keyword } from 'n12';
import { OPTIMIZE_PHOTOBANK_MAX_SEARCH_DEPTH } from '../../../../../config';
import { randomMaxItems } from '../../../../utils/randomMaxItems';
import { getSupabaseForServer } from '../../../../utils/supabase/getSupabaseForServer';
import { string_url_image } from '../../../../utils/typeAliases';

export interface SearchPhotobankOptions {
    /**
     * List of relevant keywords
     */
    readonly keywords: Array<string_keyword>;

    /**
     * Find exactly this amount of images
     *
     * Note: 1) If there is not enough images, we will try to reduce keywords
     *       2) If there is still not enough images, we will try to reduce keywords again
     *       3) If there is still not enough images, we will just pick random images
     */
    readonly imagesExactCount: number;

    /**
     * Intermediary result
     *
     * Note: theese are counted as found images
     *
     * @private used ONLY within this function
     */
    readonly _foundImages?: Array<{ src: string_url_image }>;

    /**
     * How many times we tried to get a result to return at least one image
     * How deep we are in (tail) recursion
     *
     * @private used ONLY within this function
     */
    readonly _attemptCount?: number;
}

/**
 * Search photobank on server
 */
export async function searchPhotobankOnServer(
    options: SearchPhotobankOptions,
): Promise<Array<{ src: string_url_image }>> {
    const { keywords, imagesExactCount, _foundImages = [], _attemptCount = 0 } = options;

    console.log('keywords', keywords);

    const result = await getSupabaseForServer()
        .from('Wallpaper')
        .select('*')
        .eq('isPublic', 'true')
        .limit(imagesExactCount)
        .contains('keywords', keywords);

    let images = result.data!.map(({ src }) => ({ src }));
    images = [..._foundImages, ...images];

    // TODO: This should be responsibility of the database
    const srcs = new Set<string_url_image>();
    images = images.filter(({ src }) => {
        if (srcs.has(src)) {
            return false;
        }

        srcs.add(src);
        return true;
    });

    if (images.length === imagesExactCount) {
        return images;
    } else if (images.length > imagesExactCount) {
        return randomMaxItems(imagesExactCount, ...images);
    } else if (images.length < imagesExactCount) {
        if (keywords.length <= 1 || _attemptCount > OPTIMIZE_PHOTOBANK_MAX_SEARCH_DEPTH) {
            // TODO: !! Ensure uniqueness in Wallpaper_random
            const result = await getSupabaseForServer()
                .from('Wallpaper_random')
                .select('*')
                .limit(imagesExactCount)
                .eq('isPublic', 'true');
            const randomImages = result.data!.map(({ src }) => ({ src: src! }));
            return randomImages;
        }

        // TODO: [🧠] Figure out some better way to reduce keywords
        const reducedKeywords = randomMaxItems(
            Math.ceil(keywords.length - keywords.length / OPTIMIZE_PHOTOBANK_MAX_SEARCH_DEPTH),
            ...keywords,
        );

        return /*not await */ searchPhotobankOnServer({
            imagesExactCount,
            keywords: reducedKeywords,
            _foundImages: images,
            _attemptCount: _attemptCount + 1,
        });
    }

    return images;
}
