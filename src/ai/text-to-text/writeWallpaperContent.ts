import spaceTrim from 'spacetrim';
import { parseTitleAndTopic } from '../../utils/content/parseTitleAndTopic';
import { removeQuotes } from '../../utils/content/removeQuotes';
import {
    string_font_family,
    string_image_description,
    string_markdown,
    string_midjourney_prompt,
} from '../../utils/typeAliases';
import { ChatThread } from './ChatThread';
import { completeWithGpt } from './completeWithGpt';
import { createFontPromptTemplate } from './prompt-templates/createFontPromptTemplate';
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
    wallpaperDescription: string_image_description | string_midjourney_prompt,
): Promise<string_markdown> {
    const prompt = createTitlePromptTemplate(wallpaperDescription);
    const chatThread = await ChatThread.ask(prompt);
    const { response, model: modelToCreateTitle } = chatThread;
    const { title, topic } = parseTitleAndTopic(removeQuotes(response));

    const contentStart = spaceTrim(
        (block) => `

            # ${block(title)}
            ${block(!topic ? `` : `\n\n> ${topic}\n\n`)}

        `,
    );
    const { response: contentMiddle, model: modelToCreateContent } = await completeWithGpt(
        spaceTrim(
            // TODO: [🤡] This prompt should be also created in some template function
            // TODO: [🤡] Pefect this prompt
            (block) => `

                Following is markdown content of a webpage:

                ${block(contentStart)}
        
            `,
        ),
    );

    const chatThreadFont = await chatThread.ask(createFontPromptTemplate());
    const font = removeQuotes(chatThreadFont.response) as string_font_family;

    console.log(chatThreadFont);

    return spaceTrim(
        (block) => `
    
            <!--font:${font}-->

            ${block(contentStart)}
            ${block(contentMiddle)}

            <!--
            Written by OpenAI ${modelToCreateTitle} + ${modelToCreateContent}

            Prompt:
                ${block(prompt)} 
            
            -->
        
        `,
    );
}

/**
 * TODO: !! Put step by step instructions how the content is generated in footer comment
 * TODO: [👸] Use in generate-wallpapers-content and DRY
 * TODO: [👮‍♀️] In this repository is used both 'chatgpt' and 'openai' NPM packages - use just 'openai' in future and in scripts use the common utils
 */
