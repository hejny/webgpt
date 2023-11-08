import type { uuid } from '../../../../utils/typeAliases';
import type { TextToImagePrompt } from '../../0-interfaces/TextToImagePrompt';

export interface Imgs_Request {
    /**
     * Client responsible for the requests
     */
    readonly clientId: uuid;

    /**
     * The Prompt to execute
     */
    readonly prompt: TextToImagePrompt;
}
