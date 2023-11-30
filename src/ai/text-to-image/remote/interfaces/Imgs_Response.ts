import { ImagePromptResult } from '../../0-interfaces/ImagePromptResult';

/**
 * Socket.io error for remote image generation
 *
 * This is sent from server to client when the image generation is complete
 */
export interface Imgs_Response {
    /**
     * The results of the image generation
     *
     * Note: Typically there will be only one result, but it is possible to have more than one
     */
    promptResult: Array<ImagePromptResult>;
}
