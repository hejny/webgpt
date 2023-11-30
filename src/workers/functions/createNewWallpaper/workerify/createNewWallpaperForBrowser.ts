import { createNewWallpaperWorkerify } from './createNewWallpaperWorkerify';

/**
 * Create a new wallpaper
 *
 * Note: This function is internally using webworker
 */
export const createNewWallpaperForBrowser = createNewWallpaperWorkerify.makeConnectorForBrowser(
    () => new Worker(new URL('./createNewWallpaper.worker.ts', import.meta.url)),
);

/**
 * TODO: [🧠] Maybe rename to createNewWallpaperInBrowser
 * TODO: [☄] This file should be auto-generated from createNewWallpaper.ts, there should be some tag @workerify to mark candidate for workerify
 */
