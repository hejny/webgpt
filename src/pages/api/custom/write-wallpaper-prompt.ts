import type { NextApiRequest, NextApiResponse } from 'next';
import { imageToText } from '../../../ai/image-to-text/imageToText';

import type { image_description, string_url } from '../../../utils/typeAliases';
import { isValidUrl } from '../../../utils/validators/isValidUrl';

export interface WriteWallpaperPromptResponse {
    // TODO: [🌋] ErrorableResponse
    wallpaperDescription: Exclude<image_description, JSX.Element>;
}

export default async function writeWallpaperPromptHandler(
    request: NextApiRequest,
    response: NextApiResponse<WriteWallpaperPromptResponse>,
) {
    if (request.method !== 'POST') {
        return response.status(400).json({ message: 'Only POST method is allowed' } as any);
    }

    try {
        const wallpaperUrl = request.body.wallpaperUrl as string_url;

        if (!isValidUrl(wallpaperUrl)) {
            return response
                .status(400)
                .json({ message: 'Parameter "wallpaperDescription" is required to be a valid URL' } as any);
        }

        const wallpaperDescription = await imageToText(new URL(wallpaperUrl));

        return response.status(200 /* <- TODO: [🕶] What is the right HTTP code to be here */).json({
            wallpaperDescription,
        } satisfies WriteWallpaperPromptResponse);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        return response.status(400).json({
            message: error.message /* <- TODO: [🈵] Is it good practise to reveal all error messages to client? */,
        } as any);
    }
}

/**
 * TODO: [🃏] Pass here some security token to prevent DDoS
 * TODO: [😜] CDN.isValidUrl(...)
 * TODO: [🙄] Figure out how to rename-reverse in fileview write-wallpaper-content.ts with write-wallpaper-prompt.ts
 */
