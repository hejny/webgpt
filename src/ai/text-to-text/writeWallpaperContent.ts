import spaceTrim from 'spacetrim';
import { parseTitleAndTopic } from '../../utils/content/parseTitleAndTopic';
import { removeQuotes } from '../../utils/content/removeQuotes';
import { isRunningInNode } from '../../utils/isRunningInWhatever';
import { string_image_description, string_markdown, string_midjourney_prompt } from '../../utils/typeAliases';
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
    wallpaperDescription: string_image_description | string_midjourney_prompt,
): Promise<string_markdown> {
    if (!isRunningInNode()) {
        throw new Error('writeWallpaperContent is only available on the server');
    }

    const prompt = createTitlePromptTemplate(wallpaperDescription);
    const { response, model } = await askChatGpt(prompt);
    const { title, topic } = parseTitleAndTopic(removeQuotes(response));

    return spaceTrim(
        (block) => `
    
            <!--font:Barlow Condensed-->

            # ${block(title)}
            ${block(!topic ? `` : `\n\n> ${topic}\n\n`)}

            Welcome to our website dedicated to space exploration and adventure. Our pixel art background featuring a spacecraft adds a playful and nostalgic touch to your browsing experience.

            ## Our Mission

            Our mission is to inspire curiosity and wonder about the universe through engaging content and immersive experiences. Whether you're a seasoned astronomer or just starting to explore the cosmos, we have something for everyone.

            ## Features

            - **Articles**: Our team of writers and experts provide in-depth articles on the latest discoveries, space missions, and more.
            - **Interactive Maps**: Explore the solar system and beyond with our interactive maps that let you zoom in and out, and learn about different celestial bodies.
            - **User Stories**: Read stories from other space enthusiasts who share their experiences and passion for space exploration.
            - **Resources**: Access a variety of resources including books, documentaries, and websites to deepen your knowledge and understanding of space.

            ## References

            We've compiled a list of references that you might find interesting:

            - [NASA](#) - The official website of the National Aeronautics and Space Administration.
            - [Space.com](#) - A website dedicated to space news, science, and exploration.
            - [Astronomy Magazine](#) - A magazine that covers astronomy and space science.

            ## Contact Us

            If you have any questions or feedback, please don't hesitate to contact us. We'd love to hear from you!

            - Email: info@spaceadventure.com
            - Twitter: [@spaceadventure](#)
            - Facebook: [Space Adventure](#)

            Join us on our space adventure and explore the universe with our pixel art background. Let your imagination soar!

            <!--
            Written by OpenAI ${model}

            Prompt:
                ${block(prompt)} 
            
            -->
        
        `,
    );
}

/**
 * TODO: !!! Pick font dynamically
 * TODO: !! Put step by step instructions how the content is generated in footer comment
 * TODO: [👸] Use in generate-wallpapers-content and DRY
 * TODO: [👮‍♀️] In this repository is used both 'chatgpt' and 'openai' NPM packages - use just 'openai' in future and in scripts use the common utils
 */
