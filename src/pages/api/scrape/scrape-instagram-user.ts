import type { NextApiRequest, NextApiResponse } from 'next';
import { getInstagramApiForServer } from '../../../utils/scraping/getInstagramApiForServer';
import { isValidClientId } from '../../../utils/validators/isValidClientId';

export interface ScrapeInstagramUserResponse {
    // TODO: [🌋] ErrorableResponse

    /**
     * Information about the Instagram user
     */
    instagramUser: any /* <- !!! */;
}

/**
 * API endpoint handler for scraping Instagram user
 */
export default async function scrapeInstagramUserHandler(
    request: NextApiRequest,
    response: NextApiResponse<ScrapeInstagramUserResponse>,
) {
    //---------------
    // TODO: !!! Put to every API endpoint
    // TODO: [🌺] Make middleware for this:
    const clientId = request.query.clientId; /* <- TODO: [🌺][1] Maybe pass clientId as header X-Client-Id */
    if (isValidClientId(clientId) /* <- TODO: [🌺][2] Also check if the email of client is validated */) {
        return response.status(400).json(
            {
                message: 'You must pass valid clientId' /* <- TODO: [🌻] Unite wrong GET param message */,
            } as any /* <-[🌋] */,
        );
    }
    // TODO: [🌺] Log cost for this request and attribute it to the client
    //---------------

    const instagramName = request.query.instagramName;

    if (typeof instagramName !== 'string' /* <- TODO: Better validation */) {
        return response.status(400).json(
            {
                message: 'GET param instagramName is not valid' /* <- TODO: [🌻] Unite wrong GET param message */,
            } as any /* <-[🌋] */,
        );
    }

    const instagramUser = await getInstagramApiForServer().fetchUser(instagramName);

    // console.info('👤', { instagramUser });

    return response.status(200).json({ instagramUser } satisfies ScrapeInstagramUserResponse);
}

/**
 * TODO: Maybe API URL for scraping be like> /api/scrape/instagram/@hejny
 * TODO: Maybe obtain session_id from username+password
 *     > const session_id = await getCookie('pavolhejny', '...');
 */
