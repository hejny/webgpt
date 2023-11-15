import { isValidKeyword } from 'n12';
import type { NextApiRequest, NextApiResponse } from 'next';
import { string_url_image } from '../../../utils/typeAliases';
import { searchPhotobankOnServer } from './utils/searchPhotobankOnServer';

export interface SearchPhotobankResult {
    /**
     * List of found images
     */
    readonly images: Array<{ src: string_url_image }>;

    /* <- TODO: [⛹️‍♀️] Pass here original prompt */
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

    const images = await searchPhotobankOnServer({ keywords, imagesExactCount: 4 /* <- TODO: !!! To config */ });

    return response.status(200).json({
        images,
    } satisfies SearchPhotobankResult);
}
