import { ImagePrompt } from './ImagePrompt';
import { ImagePromptResult } from './ImagePromptResult';

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
    generate(prompt: ImagePrompt): Promise<Array<ImagePromptResult>>;
}
