import { string_wallpaper_id, uuid } from '../../utils/typeAliases';
import { Workerify } from '../0-Workerify/Workerify';

export interface ICreateNewWallpaperRequest {
    author: uuid;
    wallpaperImage: Blob;
}

export interface ICreateNewWallpaperResult {
    wallpaperId: string_wallpaper_id;
}

/**
 * @private within this folder
 */
export const createNewWallpaperWorkerify = new Workerify<ICreateNewWallpaperRequest, ICreateNewWallpaperResult>();
