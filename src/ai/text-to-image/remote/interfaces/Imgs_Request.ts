import { client_id } from '../../../../utils/typeAliases';
import type { ImagePrompt } from '../../0-interfaces/ImagePrompt';

/**
 * Socket.io progress for remote image generation
 *
 * This is a request from client to server
 */
export interface Imgs_Request {
    /**
     * Client responsible for the requests
     */
    readonly clientId: client_id;

    /**
     * The Prompt to execute
     */
    readonly prompt: ImagePrompt;
}
