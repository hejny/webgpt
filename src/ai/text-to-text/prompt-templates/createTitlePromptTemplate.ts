import spaceTrim from 'spacetrim';
import { string_image_description, string_midjourney_prompt, string_prompt } from '../../../utils/typeAliases';

/**
 * Generates a template for creating web title  based on a given wallpaper description
 *
 * @param wallpaperDescription: A description of the wallpaper. This could be a plain description of the image or a prompt created from Azure's image cognition or MidJourney services.
 * @returns A title of the web
 */
export function createTitlePromptTemplate(
    wallpaperDescription: string_image_description | string_midjourney_prompt,
): string_prompt {
    return spaceTrim(
        (block) =>
            `
                Craft a title for webpage which incorporates the following wallpaper description as an alt text:

                "${block(wallpaperDescription)}"

                Guidelines:
                - This is a title for real website
                - Be short and concise
                - Do not quote
                - The title should not include parasitic words like "wallpaper" or "background".
            `,
    );
}

/**
 *  TODO: !!! Make some model comparision
 */
