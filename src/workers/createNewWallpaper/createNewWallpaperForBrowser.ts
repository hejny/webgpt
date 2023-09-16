import { createNewWallpaperWorkerify } from './createNewWallpaper.common';

/**
 * Create a new wallpaper
 *
 * Note: This function is internally using webworker
 */
export const createNewWallpaperForBrowser = createNewWallpaperWorkerify.makeConnectorForBrowser(
    () => new Worker(new URL('./createNewWallpaper.worker.ts', import.meta.url)),
);
