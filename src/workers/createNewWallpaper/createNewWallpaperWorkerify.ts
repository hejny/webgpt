import { Workerify } from '../0-Workerify/Workerify';
import { ICreateNewWallpaperRequest, ICreateNewWallpaperResult } from './createNewWallpaper';

/**
 * @private within this folder
 */

export const createNewWallpaperWorkerify = new Workerify<ICreateNewWallpaperRequest, ICreateNewWallpaperResult>();

/**
 * TODO: [☄] This file should be auto-generated from createNewWallpaper.ts, there should be some tag @workerify to mark candidate for workerify
 */
