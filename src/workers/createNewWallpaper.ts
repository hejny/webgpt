import { isRunningInBrowser } from '../utils/isRunningInWhatever';
import { provideClientId } from '../utils/supabase/provideClientId';
import { string_wallpaper_id } from '../utils/typeAliases';
import {
    IMessage_CreateNewWallpaper_Error,
    IMessage_CreateNewWallpaper_Request,
    IMessage_CreateNewWallpaper_Result,
} from './createNewWallpaper.worker';

/**
 * Internal cache for createNewWallpaper
 * @private
 * @singleton
 */
let createNewWallpaperWorker: Worker;

/**
 * Create a new wallpaper
 *
 * Note: This function is internally using web worker
 */
export function createNewWallpaper(wallpaperImage: Blob | File): Promise<string_wallpaper_id> {
    if (!isRunningInBrowser()) {
        throw new Error('You can access worker function createNewWallpaper only in browser');
    }

    if (!createNewWallpaperWorker) {
        createNewWallpaperWorker = new Worker(new URL('./createNewWallpaper.worker.ts', import.meta.url));
    }

    return new Promise((resolve, reject) => {
        createNewWallpaperWorker.addEventListener(
            'message',
            (event: MessageEvent<IMessage_CreateNewWallpaper_Result | IMessage_CreateNewWallpaper_Error>) => {
                const { type } = event.data;

                if (type === 'CREATE_NEW_WALLPAPER_RESULT') {
                    const { wallpaperId } = event.data;
                    resolve(wallpaperId);
                } else if (type === 'CREATE_NEW_WALLPAPER_ERROR') {
                    const { message } = event.data;
                    reject(new Error(message));
                } else {
                    reject(new Error(`Unexpected message type: ${type}`));
                }
            },
        );

        createNewWallpaperWorker.postMessage({
            type: 'CREATE_NEW_WALLPAPER_REQUEST',
            author: provideClientId(),
            wallpaperImage,
        } satisfies IMessage_CreateNewWallpaper_Request);
    });
}
