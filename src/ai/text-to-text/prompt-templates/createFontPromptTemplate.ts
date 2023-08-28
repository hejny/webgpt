import spaceTrim from 'spacetrim';
import { FONTS } from '../../../../config';
import { string_chat_prompt } from '../../../utils/typeAliases';

/**
 * Generates a template for figuring out best fitting font for the website.
 *
 * Note: This should be a second message in the conversation after the createTitlePromptTemplate
 *
 * @returns A template that can be used with ChatGPT to detect best fitting font for the website.
 */
export function createFontPromptTemplate(): string_chat_prompt {
    return spaceTrim(
        (block) =>
            `
                Write me a Google font which is best fitting for the website.

                Pick from the list:
                ${block(
                    [...FONTS]
                        .sort(() => Math.random() - 0.5)
                        .map((fontName) => `- ${fontName}`)
                        .join('\n'),
                )}


                Write just the font name nothing else.

            
            `,
    );
}
