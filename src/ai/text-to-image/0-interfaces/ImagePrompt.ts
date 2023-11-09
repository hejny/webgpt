/**
 * Represents a prompt for an image generator
 */

import { string_image_prompt } from '../../../utils/typeAliases';

export interface ImagePrompt {
    /**
     * The text of the prompt
     *
     * Note: This is not a template, this is exactly the text that will be sent to the model
     * @example "Cat in a hat --v 5"
     */
    readonly content: string_image_prompt;
}
