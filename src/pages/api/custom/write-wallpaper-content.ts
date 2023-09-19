import type { NextApiRequest, NextApiResponse } from 'next';
import { writeWallpaperContent } from '../../../ai/text-to-text/writeWallpaperContent';

import { description, string_markdown, uuid } from '../../../utils/typeAliases';
import { isValidClientId } from '../../../utils/validators/isValidClientId';

export interface WriteWallpaperContentResponse {
    // TODO: [🌋] ErrorableResponse
    wallpaperContent: string_markdown;
}

export default async function writeWallpaperContentHandler(
    request: NextApiRequest,
    response: NextApiResponse<WriteWallpaperContentResponse>,
) {
    if (request.method !== 'POST') {
        return response.status(400).json({ message: 'Only POST method is allowed' } as any);
    }

    const clientId = request.query.clientId as uuid; /* <-[🌺] */
    const wallpaperAssigment = request.body.wallpaperAssigment as Exclude<description, JSX.Element>;

    if (!isValidClientId(clientId)) {
        return response.status(400).json({ message: 'Parameter "clientId" must be valid client ID' } as any);
    }

    if (!wallpaperAssigment) {
        return response.status(400).json({ message: 'Parameter "wallpaperAssigment" is required' } as any);
    }

    try {
        const wallpaperContent = await writeWallpaperContent(wallpaperAssigment, clientId);

        return response.status(200 /* <- TODO: [🕶] What is the right HTTP code to be here */).json({
            wallpaperContent,
        } satisfies WriteWallpaperContentResponse);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        //TODO: Add special case for: "You exceeded your current quota"

        console.error(error);
        return response.status(503).json({
            message: error.message /* <- TODO: [🈵] Is it good practise to reveal all error messages to client? */,
        } as any);
    }
}

/**
 * TODO: [🃏] Pass here some security token to prevent DDoS
 * TODO: [😜] CDN.isValidUrl(...)
 * TODO: [🙄] Figure out how to rename-reverse in fileview write-wallpaper-content.ts with write-wallpaper-prompt.ts
 */
