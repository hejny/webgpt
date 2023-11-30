/**
 * Represents a prompt for an image generator
 */

import { string_model_name } from '@promptbook/types';
import { IVector } from 'xyzt';
import { string_image_prompt } from '../../../utils/typeAliases';

export interface ImagePrompt {
    /**
     * The text of the prompt
     *
     * Note: This is not a template, this is exactly the text that will be sent to the model
     * @example "Cat in a hat --v 5"
     */
    readonly content: string_image_prompt;

    /**
     * The model for generating images
     *
     * @example "midjourney-5", "dalle-3",...
     */
    readonly model: string_model_name;

    /**
     * Size of the generated image
     */
    readonly size?: IVector;

    /**
     * Additional settings for the model
     *
     * @example { "style": "natural" }
     */
    readonly modelSettings?: Record<string, string>;
}
