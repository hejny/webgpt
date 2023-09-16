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

    const response = await fetch(url as string);

    const webInfo = await response.text();

    // console.info('👤', { instagramUser });

    return response.status(200).json({ webInfo } satisfies ScrapeWebResponse);
}

/**
 * TODO: !!! [🧠] How to extract the article from the web?
 * TODO: !!! Use puppeteer to scrape the web
 */
