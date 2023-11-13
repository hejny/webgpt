import { isRunningInBrowser, isRunningInWebWorker } from '../../utils/isRunningInWhatever';
import { ImageGenerator } from './0-interfaces/ImageGenerator';
import { PregeneratedPhotobank } from './photobank/photobank';

/**
 * Get the photobank
 *
 * Note: Photobank is cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in browser or worker
 *
 * @returns ImageGenerator based on pregenerated MidJourney images
 */
export function getPhotobank(): ImageGenerator {
    if (!isRunningInWebWorker() && !isRunningInBrowser()) {
        throw new Error('This function is available ONLY in browser or worker');
    }

    return PregeneratedPhotobank.getInstance();
}

/**
 * TODO: [🧠] This function maybe overabstraction, because it is just wrapper around PregeneratedPhotobank.getInstance
 * TODO: Browser and worker should be checked in the PregeneratedPhotobank.getInstance
 */
