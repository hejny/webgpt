import { IS_DEVELOPMENT, NEXT_PUBLIC_IMAGE_SERVER_URL } from '../../../config';
import { isRunningInBrowser, isRunningInWebWorker } from '../../utils/isRunningInWhatever';
import { client_id } from '../../utils/typeAliases';
import { ImageGenerator } from './0-interfaces/ImageGenerator';
import { RemoteImageGenerator } from './remote/RemoteImageGenerator';

/**
 * This is an image generator
 * Internal cache for getImageGenerator
 *
 * @private
 * @singleton
 */
let imageGenerator: ImageGenerator;

/**
 * Get the image generator
 *
 * Note: Image generator is cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in browser or worker
 *
 * @returns ImageGenerator based on OpenAI Dalle
 */
export function getImageGenerator(clientId: client_id): ImageGenerator {
    if (!isRunningInWebWorker() && !isRunningInBrowser()) {
        throw new Error('This function is available ONLY in browser or worker');
    }

    if (!imageGenerator) {
        const isVerbose = IS_DEVELOPMENT;

        imageGenerator = new RemoteImageGenerator({
            isVerbose,
            remoteUrl: NEXT_PUBLIC_IMAGE_SERVER_URL,
            path: '/promptimage/socket.io',
            clientId,
        });
    }

    return imageGenerator;
}

/**
 * TODO: [🧠] Maybe cache every clientId
 */
