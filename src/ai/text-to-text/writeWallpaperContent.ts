import spaceTrim from 'spacetrim';
import { parseTitleAndTopic } from '../../utils/content/parseTitleAndTopic';
import { removeQuotes } from '../../utils/content/removeQuotes';
import {
    image_description,
    string_font_family,
    string_markdown,
    string_midjourney_prompt,
    uuid,
} from '../../utils/typeAliases';
import { ChatThread } from './ChatThread';
import { completeWithGpt } from './completeWithGpt';
import {
    WRITE_WEBSITE_CONTENT_TEMPLATE,
    WRITE_WEBSITE_FONT_TEMPLATE,
    WRITE_WEBSITE_TITLE_TEMPLATE,
} from './prompt-templates';

/**
 * Writes the rich content of the wallpaper page
 *
 * Note: This function is aviable only on the server
 *
 * @param wallpaperAssigment as a plain description what is on the wallpaper (created for expample from imageToText or midjourney prompt)
 * @returns Content of the wallpaper page
 */
export async function writeWallpaperContent(
    wallpaperAssigment: Exclude<image_description, JSX.Element> | string_midjourney_prompt,
    clientId: uuid /* <-[🌺] */,
): Promise<string_markdown> {
    const writeTitlePrompt = WRITE_WEBSITE_TITLE_TEMPLATE.makePrompt({});
    const writeTitleThread = await ChatThread.ask(writeTitlePrompt, clientId);
    const { response: titleRaw, model: writeTitleModel } = writeTitleThread;
    const { title, topic } = parseTitleAndTopic(removeQuotes(titleRaw));

    // TODO: !!! USE WRITE_WEBSITE_CLAIM_TEMPLATE
    // TODO: !!! Separate title, claim and content writing endpoint
    // TODO: !!! Use MAX_CHARS_IN_TITLE
    // TODO: !!! Use MAX_CHARS_IN_TITLE_WORD

    const contentStart = spaceTrim(
        (block) => `

            # ${block(title)}
            ${block(!topic ? `` : `\n\n> ${topic}\n\n`)}

        `,
    );
    const { response: contentMiddle, model: modelToCreateContentMiddle } = await completeWithGpt(
        WRITE_WEBSITE_CONTENT_TEMPLATE.makePrompt({ contentStart /* <- !!! In prompt template file */ }),
        clientId,
    );

    // TODO: !!! Remove strange images https://1-2i.com/mountain-sunset-2gr7dv4ybstg
    // TODO: !!! Test that the content is valid and rich markdown
    // TODO: !!! Do NOT use words like "serene", "serenity" soo often

    const chatThreadFont = await writeTitleThread.ask(WRITE_WEBSITE_FONT_TEMPLATE.makePrompt({}));
    const font = removeQuotes(chatThreadFont.response) as string_font_family;

    // TODO: !!! Better font picking
    // console.log(chatThreadFont);

    return spaceTrim(
        (block) => `
    
            <!--font:${font}-->

            ${block(contentStart)}
            ${block(contentMiddle)}
        
        `,
    );
}

/**
 * TODO: !! Put step by step instructions how the content is generated in footer comment
 * TODO: [👸] Use in generate-wallpapers-content and DRY
 * TODO: [👮‍♀️] In this repository is used both 'chatgpt' and 'openai' NPM packages - use just 'openai' in future and in scripts use the common utils
 * TODO: Make IWriteWallpaperContentOptions
 */
