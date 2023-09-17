import type { NextApiRequest, NextApiResponse } from 'next';
import { string_url } from '../../../utils/typeAliases';
import { isUrlOnPrivateNetwork } from '../../../utils/validators/isUrlOnPrivateNetwork';
import { isValidClientId } from '../../../utils/validators/isValidClientId';
import { isValidUrl } from '../../../utils/validators/isValidUrl';

/**
 * API endpoint handler for scraping Instagram user
 */
export default async function scrapeInstagramUserHandler(
    request: NextApiRequest,
    response: NextApiResponse /* <- TODO: [❄] What is the best way how to type non-json reposnses */,
) {
    //---------------
    // TODO: !!! Put to every API endpoint
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

    const url = request.query.url;

    if (!isValidUrl(url)) {
        return response.status(400).json(
            {
                message: 'GET param url is not valid URL' /* <- TODO: [🌻] Unite wrong GET param message */,
            } as any /* <-[🌋] */,
        );
    }

    if (isUrlOnPrivateNetwork(url)) {
        return response.status(403).json(
            {
                message: `Url "${url}" is on private network. This is not allowed for security reasons.`,
            } as any /* <-[🌋] */,
        );
    }

    const imageResponse = await fetch(
        url as string_url,
        // TODO: Limit size and timeout
    ).catch((response) => ({
        status: 404 as const,
    }));

    if (imageResponse.status === 404) {
        return response.status(404).json(
            {
                message: `Url "${url}" does not exist`,
            } as any /* <-[🌋] */,
        );
    }

    if (imageResponse.status !== 200) {
        return response.status(400).json(
            {
                message: `Url "${url}" does not responded with 200 but ${imageResponse.status}`,
            } as any /* <-[🌋] */,
        );
    }

    const contentType = imageResponse.headers.get('Content-Type') || 'unknown';

    if (!contentType.startsWith('image/')) {
        return response.status(403).json(
            {
                message: `Url "${url}" is not image but ${imageResponse.type}`,
            } as any /* <-[🌋] */,
        );
    }
    console.log(response);

    return response
        .setHeader('Content-Type', contentType)
        .status(200)
        .end(
            Buffer.from(
                await imageResponse.arrayBuffer(),
            ) /* <- TODO: Can it be made more elegantely then converting response -> arrayBuffer -> buffer? */,
        );
}

/**
 * TODO: Maybe> response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
 */
