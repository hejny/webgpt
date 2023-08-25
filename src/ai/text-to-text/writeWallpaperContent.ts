import spaceTrim from 'spacetrim';
import { isRunningInNode } from '../../utils/isRunningInWhatever';
import {
    string_image_description,
    string_markdown,
    string_midjourney_prompt,
    string_prompt,
} from '../../utils/typeAliases';
import { askChatGpt } from './askChatGpt';
import { createTitlePromptTemplate } from './prompt-templates/createTitlePromptTemplate';

/**
 * Writes the rich content of the wallpaper page
 *
 * Note: This function is aviable only on the server
 *
 * @param wallpaperDescription as a plain description what is on the wallpaper (created for expample from imageToText or midjourney prompt)
 * @returns Content of the wallpaper page
 */
export async function writeWallpaperContent(
    wallpaperDescription: string_image_description | string_midjourney_prompt | string_prompt,
): Promise<string_markdown> {
    if (!isRunningInNode()) {
        throw new Error('writeWallpaperContent is only available on the server');
    }

    const { responseText, metadataText } = await askChatGpt({
        requestText: createTitlePromptTemplate(wallpaperDescription),
    });

    return spaceTrim(
        (block) => `

            # ${block(responseText)}
    
            Content !!!

            <!-- ${block(metadataText)} -->
        
        `,
    );
}

/**
 * TODO: [👸] Use in generate-wallpapers-content and DRY
 * TODO: [👮‍♀️] In this repository is used both 'chatgpt' and 'openai' NPM packages - use just 'openai' in future and in scripts use the common utils
 */
