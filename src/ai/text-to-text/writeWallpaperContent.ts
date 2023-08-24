import spaceTrim from 'spacetrim';
import {
    string_image_description,
    string_markdown,
    string_midjourney_prompt,
    string_prompt,
} from '../../utils/typeAliases';

/**
 * Writes the rich content of the wallpaper page
 *
 * @param wallpaperDescription as a plain description what is on the wallpaper (created for expample from imageToText or midjourney prompt)
 * @returns Content of the wallpaper page
 */
export async function writeWallpaperContent(
    wallpaperDescription: string_image_description | string_midjourney_prompt | string_prompt,
): Promise<string_markdown> {
    return spaceTrim(
        (block) => `
    
            # Mock:

            ${block(wallpaperDescription)}

        `,
    );
}

/**
 * TODO: !!! Implement
 * TODO: [👸] Use in generate-wallpapers-content and DRY
 */
