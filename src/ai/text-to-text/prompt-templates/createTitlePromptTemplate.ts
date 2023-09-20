import { spaceTrim } from 'spacetrim';
import { image_description, string_chat_prompt, string_midjourney_prompt } from '../../../utils/typeAliases';

/**
 * Generates a template for creating web title  based on a given wallpaper description
 *
 * @param wallpaperAssigment: A description of the wallpaper. This could be a plain description of the image or a prompt created from Azure's image cognition or MidJourney services.
 * @returns A title of the web
 */
export function createTitlePromptTemplate(
    wallpaperAssigment: Exclude<image_description, JSX.Element> | string_midjourney_prompt,
): string_chat_prompt {
    return spaceTrim(
        (block) =>
            `
                Craft a title for webpage which incorporates the following wallpaper description as an alt text:

                "${block(wallpaperAssigment)}"

                Guidelines:
                - This is a title for real website
                - Be short and concise
                - The title should not include parasitic words like "wallpaper" or "background".
            `,
    );
}

/**
 *  TODO: [🤡] Make some model comparision
 */
