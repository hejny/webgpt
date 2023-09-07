import type { NextApiRequest, NextApiResponse } from 'next';
import spaceTrim from 'spacetrim';
import { IWallpaperSerialized } from '../../utils/IWallpaper';
import { string_prompt } from '../../utils/typeAliases';

export interface UpdateWallpaperContentRequest {
    prompt: string_prompt;
    wallpaper: Pick<IWallpaperSerialized, 'content'>;
}

export interface UpdateWallpaperContentResponse {
    // TODO: [🌋] ErrorableResponse
    updatedWallpaper: Pick<IWallpaperSerialized, 'content'>;
}

export default async function updateWallpaperContentHandler(
    request: NextApiRequest,
    response: NextApiResponse<UpdateWallpaperContentResponse>,
) {
    const { prompt, wallpaper } = JSON.parse(
        request.body,
    ) /* <- TODO: Can be this done via bodyParser? */ as UpdateWallpaperContentRequest;

    try {
        // TODO: [🍛] Make same normalization as in the frontend
        const normalizedPrompt = spaceTrim(prompt);

        wallpaper.content += `\n\n> ${normalizedPrompt}`;

        return response.status(200).json({
            updatedWallpaper: wallpaper,
        } satisfies UpdateWallpaperContentResponse);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        console.error(error);
        return response.status(500).json({ message: error.message } as any /* <- [🌋]  */);
    }
}

/**
 * TODO: !!! Allow only POST OR PUT (Which is better?)
 * TODO: [🤺] Optimize, maybe cache inputs and results
 */
