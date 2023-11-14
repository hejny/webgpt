import { uuid } from '@promptbook/types';
import { IS_DEVELOPMENT } from '../../../config';
import { isRunningInBrowser, isRunningInWebWorker } from '../../utils/isRunningInWhatever';
import { ImageGenerator } from './0-interfaces/ImageGenerator';
import { PregeneratedPhotobank } from './photobank/PregeneratedPhotobank';

/**
 * This is an photobank
 * Internal cache for getPhotobank
 *
 * @private
 * @singleton
 */
let photobank: PregeneratedPhotobank;

/**
 * Get the photobank
 *
 * Note: Photobank is cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in browser or worker
 *
 * @returns ImageGenerator based on pregenerated MidJourney images
 */
export function getPhotobank(clientId: uuid): ImageGenerator {
    if (!isRunningInWebWorker() && !isRunningInBrowser()) {
        throw new Error('This function is available ONLY in browser or worker');
    }

    if (!photobank) {
        const isVerbose = IS_DEVELOPMENT;

        photobank = new PregeneratedPhotobank({
            isVerbose,
            clientId,
        });
    }

    return photobank;
}

/**
 * TODO: [🧠] Maybe cache every clientId
 */
