import { string_url_image } from '@promptbook/types';
import { ImagePrompt } from './ImagePrompt';

/**
 * Represents a result of a prompt for an image generator
 */

export interface ImagePromptResult {
    /**
     * The image generated from the prompt
     */
    readonly imageSrc: string_url_image;

    /**
     * The original prompt that generated this result
     */
    readonly originalPrompt: ImagePrompt;

    /**
     * The normalized/postprocessed prompt used to generate this result
     */
    readonly normalizedPrompt: ImagePrompt;

    /**
     * Raw response from the model
     */
    readonly rawResponse: object;
}