import type { NextApiRequest, NextApiResponse } from 'next';
import spaceTrim from 'spacetrim';
import { ChatThread } from '../../ai/text-to-text/ChatThread';
import { removeQuotes } from '../../utils/content/removeQuotes';
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

        const chatThread = await ChatThread.ask(
            spaceTrim(
                (block) => `
                    Act as a copywriter and modify the content of the page according to the user prompt.

                    The prompt:
                    ${block(normalizedPrompt)}

                    Current content of the page:
                    ${block(wallpaper.content)}
                
                ` /* <- TODO: Make prompt template */,
            ),
        );

        let newContent = chatThread.response;
        newContent = removeQuotes(newContent);

        return response.status(200).json({
            updatedWallpaper: {
                content: chatThread.response,
            },
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
 * TODO: !! Allow only POST OR PUT (Which is better?)
 * TODO: !! Allow to mix user and copilot edits
 * TODO: !! Preserve fonts
 * TODO: !! Append prompts (have history of prompts)
 * TODO: [🤺] Optimize, maybe cache inputs and results
 */
