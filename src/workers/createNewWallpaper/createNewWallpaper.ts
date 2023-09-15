import { createNewWallpaperWorkerify } from './createNewWallpaper.common';

/**
 * Create a new wallpaper
 *
 * Note: This function is internally using web worker
 */
export const createNewWallpaper = createNewWallpaperWorkerify.makeConnector(
    () => new Worker(new URL('./createNewWallpaper.worker.ts', import.meta.url)),
);
