import { TextToImagePrompt } from '../0-interfaces/TextToImagePrompt';

/**
 * Prompt to Dalle image generator
 */
export interface DallePrompt extends TextToImagePrompt {
    /**
     * Which dalle version to use
     */
    dalleVersion: 2 | 3;

    /**
     * The style of the generated images. Must be one of `vivid` or `natural`. Vivid
     * causes the model to lean towards generating hyper-real and dramatic images.
     * Natural causes the model to produce more natural, less hyper-real looking
     * images. This param is only supported for Dalle-3.
     */
    style: 'natural' | 'vivid';
}
