import { supportDialogues } from '../../../dialogues';
import { Workerify } from '../../../lib/Workerify';
import { CreateNewWallpaperRequest } from '../interfaces/CreateNewWallpaperRequest';
import { CreateNewWallpaperResult } from '../interfaces/CreateNewWallpaperResult';

/**
 * @private Use only withing the folder createNewWallpaper
 */

export const createNewWallpaperWorkerify = new Workerify<CreateNewWallpaperRequest, CreateNewWallpaperResult>({
    supportDialogues,
    isPreventedUnsavedChanges: true,
});

/**
 * TODO: [☄] This file should be auto-generated from createNewWallpaper.ts, there should be some tag @workerify to mark candidate for workerify
 */
