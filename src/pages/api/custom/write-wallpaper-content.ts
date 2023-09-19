import type { NextApiRequest, NextApiResponse } from 'next';
import { writeWallpaperContent, WriteWallpaperContentOptions } from '../../../ai/text-to-text/writeWallpaperContent';
import { string_markdown, uuid } from '../../../utils/typeAliases';
import { isValidClientId } from '../../../utils/validators/isValidClientId';

export type WriteWallpaperContentRequest = Omit<WriteWallpaperContentOptions, 'clientId'>;

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

    if (!isValidClientId(clientId)) {
        return response.status(400).json({ message: 'Parameter "clientId" must be valid client ID' } as any);
    }

    const { title, assigment, addSections, links } = request.body as WriteWallpaperContentRequest;

    const wallpaperContent = await writeWallpaperContent({ clientId, title, assigment, addSections, links });

    return response.status(200 /* <- TODO: [🕶] What is the right HTTP code to be here */).json({
        wallpaperContent,
    } satisfies WriteWallpaperContentResponse);
}

/**
 * TODO: [🃏] Pass here some security token to prevent DDoS
 * TODO: [😜] CDN.isValidUrl(...)
 * TODO: [🙄] Figure out how to rename-reverse in fileview write-wallpaper-content.ts with write-wallpaper-prompt.ts
 */
