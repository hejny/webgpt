import type { CommonExecutionToolsOptions, uuid } from '@promptbook/types';
import type { ImageGenerator } from '../../0-interfaces/ImageGenerator';

export interface CreateRemoteImageGeneratorServerOptions extends CommonExecutionToolsOptions {
    /**
     * Port on which the server will listen
     */
    readonly port: number;

    /**
     * Provides an image generator for a given client
     */
    createImageGenerator(clientId: uuid): ImageGenerator;
}
