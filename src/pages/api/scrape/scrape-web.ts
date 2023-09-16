import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidUrl } from '../../../utils/validators/isValidUrl';

export interface ScrapeWebResponse {
    // TODO: [🌋] ErrorableResponse

    /**
     * Information about the Instagram user
     */
    webInfo: any /* <- !!! */;
}

export default async function scrapeInstagramUserHandler(
    request: NextApiRequest,
    response: NextApiResponse<ScrapeWebResponse>,
) {
    const url = request.query.url;

    if (!isValidUrl(url)) {
        return response.status(400).json({ message: 'GET param url is not valid URL' } as any /* <-[🌋] */);
    }

    const webInfo = await fetch(url as string);

    // console.info('👤', { instagramUser });

    return response.status(200).json({ webInfo } satisfies ScrapeWebResponse);
}

/**
 * TODO: Maybe API URL for scraping be like> /api/scrape/instagram/@hejny
 * TODO: Maybe obtain session_id from username+password
 *     > const session_id = await getCookie('pavolhejny', '...');
 */
