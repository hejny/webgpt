import type { NextApiRequest, NextApiResponse } from 'next';
import { writeWallpaperContent } from '../../../ai/text-to-text/writeWallpaperContent';

import { string_markdown } from '../../../utils/typeAliases';

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

    const wallpaperDescription = request.query.wallpaperDescription as string_markdown;

    if (!wallpaperDescription) {
        return response.status(400).json({ message: 'Parameter "wallpaperDescription" is required' } as any);
    }

    const wallpaperContent = await writeWallpaperContent(wallpaperDescription);

    return response.status(200 /* <- TODO: [🕶] What is the right HTTP code to be here */).json({
        wallpaperContent,
    } satisfies WriteWallpaperContentResponse);
}

/**
 * TODO: [🃏] Pass here some security token to prevent DDoS
 * TODO: [😜] CDN.isValidUrl(...)
 * TODO: [🙄] Figure out how to rename-reverse in fileview write-wallpaper-content.ts with write-wallpaper-prompt.ts
 */
