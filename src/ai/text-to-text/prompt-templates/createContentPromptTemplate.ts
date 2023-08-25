import spaceTrim from 'spacetrim';
import { string_image_description, string_midjourney_prompt, string_prompt } from '../../../utils/typeAliases';

/**
 * Creates the prompt for creating the content of the page
 *
 * @param wallpaperDescription as a plain description what is on the wallpaper image (created for expample from Azure image cognition describe or MidJourney prompt)
 * @returns the prompt which can be passed to ChatGPT to generate the content of the page
 */
export function createContentPromptTemplate(
    wallpaperDescription: string_image_description | string_midjourney_prompt | string_prompt,
) {
    return spaceTrim(
        (block) =>
            `
            Write me content for website with wallpaper which alt text is:

            "${block(wallpaperDescription)}"

            The name/title of the page should not be 1:1 copy of the alt text but rather a real content of the website which is using this wallpaper.

            - Use markdown format 
            - Start with heading
            - Heading should be short and concise
            - The content should look like a real website 
            - The website should not be about the wallpaper, wallpaper is just a related background
            - Heading should be contain work "wallpaper" or "background"
            - Include real sections like references, contact, user stories, etc. use things relevant to the page purpose.
            - Feel free to use structure like headings, bullets, numbering, blockquotes, paragraphs, horizontal lines, etc.
            - You can use formatting like bold or _italic_
            - You can include UTF-8 emojis
            - Links should be only #hash anchors (and you can refer to the document itself)
            - Do not include images
        `,
    );
}
