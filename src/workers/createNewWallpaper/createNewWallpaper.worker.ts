import { createNewWallpaper } from './createNewWallpaper';
import { createNewWallpaperWorkerify } from './createNewWallpaperWorkerify';

createNewWallpaperWorkerify.runWorker(createNewWallpaper);

/**
 * TODO: [☄] This file should be auto-generated from createNewWallpaper.ts, there should be some tag @workerify to mark candidate for workerify
 */
