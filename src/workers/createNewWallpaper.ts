import { isRunningInBrowser } from '../utils/isRunningInWhatever';

/**
 * Internal cache for @@@
 * @private
 * @singleton
 */
let createNewWallpaperWorker: Worker;

/**
 * @@@
 */
export function getCreateNewWallpaperWorker(): Worker {
    if (!isRunningInBrowser()) {
        throw new Error('You can access workers only in browser');
    }

    if (!createNewWallpaperWorker) {
        createNewWallpaperWorker = new Worker(new URL('./createNewWallpaper.worker.ts', import.meta.url));
    }

    return createNewWallpaperWorker;
}

/**
 * TODO: !!! Envelope worker API as a standard function
 */
