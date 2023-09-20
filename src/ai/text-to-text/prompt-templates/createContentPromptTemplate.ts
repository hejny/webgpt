import { spaceTrim } from 'spacetrim';
import { image_description, string_chat_prompt, string_midjourney_prompt } from '../../../utils/typeAliases';

/**
 * Generates a template for creating web content based on a given wallpaper description
 *
 * @param wallpaperDescription: A description of the wallpaper. This could be a plain description of the image or a prompt created from Azure's image cognition or MidJourney services.
 * @returns A template that can be used with ChatGPT to generate a webpage content.
 */
export function createContentPromptTemplate(
    wallpaperDescription: Exclude<image_description, JSX.Element> | string_midjourney_prompt,
): string_chat_prompt {
    return spaceTrim(
        (block) =>
            `
                Craft a webpage content which incorporates the following wallpaper description as an alt text:

                "${block(wallpaperDescription)}"

                Guidelines:
                - The webpage title should not directly copy the alt text but should be creatively derived from it.
                - Utilize markdown format.
                - Begin with a concise heading.
                - Aim for content that realistically portrays a functioning website, not a mere display of the wallpaper.
                - The heading should not include words like "wallpaper" or "background".
                - The content should feature real sections such as references, contact information, user stories, etc., as per the objective of the page.
                - Structure the content with headings, bullets, numbering, blockquotes, paragraphs, horizontal lines, etc.
                - Feel free to use bold or _italic_ text for emphasis.
                - Incorporate UTF-8 emojis for added appeal.
                - Links should be only #hash anchors referring to the document itself.
                - Avoid including any images.
            `,
    );
}

/**
 *  TODO: [🤡] Make some model comparision
 */
