import { string_url_image } from '@promptbook/types';
import { TextToImagePrompt } from './TextToImagePrompt';

/**
 * Represents a result of a prompt for an image generator
 */

export interface TextToImagePromptResult {
    /**
     * The image generated from the prompt
     */
    readonly imageSrc: string_url_image;

    /**
     * The original prompt that generated this result
     */
    readonly originalPrompt: TextToImagePrompt;

    /**
     * The normalized/postprocessed prompt used to generate this result
     */
    readonly normalizedPrompt?: TextToImagePrompt;
}
