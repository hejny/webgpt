import { createNewWallpaper } from '../createNewWallpaper';
import { createNewWallpaperWorkerify } from './createNewWallpaperWorkerify';

/**
 * @private Use only withing the folder createNewWallpaper
 */
createNewWallpaperWorkerify.runWorker(createNewWallpaper);

/**
 * TODO: [☄] This file should be auto-generated from createNewWallpaper.ts, there should be some tag @workerify to mark candidate for workerify
 */
