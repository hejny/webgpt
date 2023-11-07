import { TextToImagePrompt } from './TextToImagePrompt';
import { TextToImagePromptResult } from './TextToImagePromptResult';

/**
 * Represents any image generator (like MidJourney, Dall-E, StableDiffusion, etc.) or more generally any software that can give images from text.
 */
export interface ImageGenerator {
    /**
     * Generates an image from a prompt
     *
     * @param prompt to generate new image from
     * @returns generated image(s)
     */
    generate(prompt: TextToImagePrompt): Promise<Array<TextToImagePromptResult>>;
}


