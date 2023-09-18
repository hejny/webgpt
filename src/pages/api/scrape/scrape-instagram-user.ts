import type { GraphqlUser } from 'insta-fetcher/dist/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import spaceTrim from 'spacetrim';
import { explainError } from '../../../utils/extraMessage';
import { getInstagramApiForServer, resetInstagramApiForServer } from '../../../utils/scraping/getInstagramApiForServer';
import { isValidClientId } from '../../../utils/validators/isValidClientId';

export interface ScrapeInstagramUserResponse {
    // TODO: [🌋] ErrorableResponse

    /**
     * Information about the Instagram user
     */
    instagramUser: GraphqlUser;
}

/**
 * API endpoint handler for scraping Instagram user
 */
export default async function scrapeInstagramUserHandler(
    request: NextApiRequest,
    response: NextApiResponse<ScrapeInstagramUserResponse>,
) {
    //---------------
    // TODO: [🌺] Make middleware for this:
    const clientId = request.query.clientId; /* <- TODO: [🌺][1] Maybe pass clientId as header X-Client-Id */
    if (!isValidClientId(clientId) /* <- TODO: [🌺][2] Also check if the email of client is validated */) {
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

    try {
        const instagramApi = await getInstagramApiForServer();
        // console.log('!!!', { instagramApi });

        const instagramUser = await instagramApi
            .fetchUserV2(instagramName)
            .catch(explainError(`Can not fetch Instagram user @${instagramName}`));
        // console.info('👤', { instagramUser });

        return response.status(200).json({ instagramUser } satisfies ScrapeInstagramUserResponse);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        if (error.message.includes('Invalid cookie') || error.message.includes('failed with status code 401')) {
            await resetInstagramApiForServer();
            return response.status(425).json(
                {
                    message: 'Refreshing Instagram session. Please try again in few seconds.',
                } as any /* <-[🌋] */,
            );
        }

        console.error(error);
        return response.status(500).json(
            {
                message: spaceTrim(
                    (block) => `
        
                        There was an error while scraping Instagram user @${instagramName}

                        ${block((error as Error).message)}
                    `,
                ),
            } as any /* <-[🌋] */,
        );
    }
}

/**
 * TODO: [🧠] Automatically folow on Instagram when scraping
 * TODO: [🧠] Automatically post newly created web as story / post on Instagram
 * TODO: Maybe API URL for scraping be like> /api/scrape/instagram/@hejny
 * TODO: Maybe obtain session_id from username+password
 *     > const session_id = await getCookie('pavolhejny', '...');
 */
