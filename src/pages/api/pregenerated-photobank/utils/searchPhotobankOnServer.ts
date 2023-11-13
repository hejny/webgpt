import { string_keyword } from 'n12';
import { randomMaxItems } from '../../../../utils/randomMaxItems';
import { getSupabaseForServer } from '../../../../utils/supabase/getSupabaseForServer';
import { string_url_image } from '../../../../utils/typeAliases';

export interface SearchPhotobankOptions {
    /**
     * List of relevant keywords
     */
    readonly keywords: Array<string_keyword>;

    /**
     * How many times we tried to get a result to return at least one image
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
    const { keywords, _attemptCount = 0 } = options;

    console.log('keywords', keywords);

    const result = await getSupabaseForServer()
        .from('Wallpaper')
        .select('*')
        .eq('isPublic', 'true')
        .limit(100)
        .contains('keywords', keywords);

    let images = result.data!.map(({ src }) => ({ src }));

    if (images.length === 0) {
        if (_attemptCount > 10) {
            return [];
        }

        // TODO: [🧠] Figure out some better way to reduce keywords
        const reducedKeywords = randomMaxItems(keywords.length - 1, ...keywords);

        if (reducedKeywords.length === 0) {
            return [];
        }

        return /*not await */ searchPhotobankOnServer({
            keywords: reducedKeywords,
            _attemptCount: _attemptCount + 1,
        });
    }

    return images;
}
