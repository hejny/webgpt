import spaceTrim from 'spacetrim';
import { FONTS } from '../../../../config';

// TODO: !!! Annotate

export function createFontPromptTemplate() {
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
