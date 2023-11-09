import { ImagePrompt } from '../../0-interfaces/ImagePrompt';

/**
 * Prompt to Dalle image generator
 */
export interface DallePrompt extends ImagePrompt {
    /**
     * Which dalle version to use
     *
     * Note: "dalle-x" and "dall-e-x" are aliases
     */
    model: 'dalle-2' | 'dalle-3' | 'dall-e-2' | 'dall-e-3';

    modelSettings?: {
        /**
         * The style of the generated images. Must be one of `vivid` or `natural`. Vivid
         * causes the model to lean towards generating hyper-real and dramatic images.
         * Natural causes the model to produce more natural, less hyper-real looking
         * images. This param is only supported for Dalle-3.
         */
        style?: 'natural' | 'vivid';

        /**
         * The quality of the image that will be generated. `hd` creates images with finer
         * details and greater consistency across the image. This param is only supported
         * for `dall-e-3`.
         */
        quality?: 'standard' | 'hd';
    };
}

/**
 * TODO: Allow to put variantsCount
 */
