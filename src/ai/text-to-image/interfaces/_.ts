import type { string_image_prompt, string_url_image } from '@promptbook/types';

export interface ImageGenerator {
    generate(prompt: TextToImagePrompt): Promise<Array<TextToImagePromptResult>>;
}

export interface TextToImagePrompt {
    /**
     * The text of the prompt
     *
     * Note: This is not a template, this is exactly the text that will be sent to the model
     * @example "Cat in a hat --v 5"
     */
    readonly content: string_image_prompt;
}

export interface TextToImagePromptResult {
    imageSrc: string_url_image;
    /*
    image: Blob | File;
    */
}

/**
 * TODO: !!! Split into files
 * TODO: !!! Annotate
 */
