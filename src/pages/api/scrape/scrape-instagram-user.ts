import { igApi } from 'insta-fetcher';

import type { NextApiRequest, NextApiResponse } from 'next';
import { INSTAGRAM_COOKIE } from '../../../../config';

const instagram = new igApi(INSTAGRAM_COOKIE); /* <- TODO: To utils with cache simmilar as supabaseForServer */

export interface ScrapeInstagramUserResponse {
    // TODO: [🌋] ErrorableResponse

    /**
     * Information about the Instagram user
     */
    instagramUser: any /* <- !!! */;
}

export default async function scrapeInstagramUserHandler(
    request: NextApiRequest,
    response: NextApiResponse<ScrapeInstagramUserResponse>,
) {
    const instagramName = request.query.instagramName;

    if (typeof instagramName !== 'string' /* <- TODO: Better validation */) {
        return response.status(400).json({ message: 'GET param instagramName is not valid' } as any /* <-[🌋] */);
    }

    const instagramUser = await instagram.fetchUser(instagramName);

    // console.info('👤', { instagramUser });

    return response.status(200).json({ instagramUser } satisfies ScrapeInstagramUserResponse);
}

/**
 * TODO: Maybe API URL for scraping be like> /api/scrape/instagram/@hejny
 * TODO: Maybe obtain session_id from username+password
 *     > const session_id = await getCookie('pavolhejny', '...');
 */
