import { isValidKeyword } from 'n12';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseForServer } from '../../../utils/supabase/getSupabaseForServer';
import { string_url_image } from '../../../utils/typeAliases';

export interface SearchPhotobankResult {
    /**
     * List of found images
     */
    readonly images: Array<{ src: string_url_image }>;
}

/**
 * API endpoint handler which returns information about the application
 */
export default async function searchPhotobankHandler(
    request: NextApiRequest,
    response: NextApiResponse<SearchPhotobankResult>,
) {
    let keywords = request.query.keywords;

    if (typeof keywords === 'string') {
        keywords = [keywords];
    }

    if (!(Array.isArray(keywords) && keywords.every((keyword) => typeof keyword === 'string'))) {
        return response.status(400).json(
            {
                message: `You need to specify a valid list of "keywords" in the query.`,
            } as any /* <- TODO: Type helper ResponseWithError<T> */,
        );
    }

    if (!keywords.every(isValidKeyword)) {
        return response.status(400).json(
            {
                message: `Specifyed list of "keywords" are not normalized propperly.`,
            } as any /* <- TODO: Type helper ResponseWithError<T> */,
        );
    }

    const result = await getSupabaseForServer()
        .from('Wallpaper')
        .select('*')
        .eq('isPublic', 'true')
        .limit(100)
        .contains('keywords', keywords);

    let images = result.data!.map(({ src }) => ({ src }));

    // TODO: This should be responsibility of the database
    const srcs = new Set<string>();
    images = images.filter(({ src }) => {
        if (srcs.has(src)) {
            return false;
        }

        srcs.add(src);
        return true;
    });

    return response.status(200).json({
        images,
    } satisfies SearchPhotobankResult);
}
