import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
import { addWallpaperComputables } from '../../../utils/addWallpaperComputables';
import { serializeWallpaper } from '../../../utils/hydrateWallpaper';
import { getSupabaseForWorker } from '../../../utils/supabase/getSupabaseForWorker';
import { createNewWallpaper_prepareFromIdea } from './createNewWallpaper_prepareFromIdea';
import { createNewWallpaper_prepareFromImage } from './createNewWallpaper_prepareFromImage';
import { CreateNewWallpaperRequest } from './interfaces/CreateNewWallpaperRequest';
import { CreateNewWallpaperResult } from './interfaces/CreateNewWallpaperResult';

/**
 * Create a new wallpaper
 *
 * @workerify Do not use directly, use createNewWallpaperForBrowser instead
 * @private Use only withing the folder createNewWallpaper
 */
export async function createNewWallpaper(
    request: CreateNewWallpaperRequest,
    onProgress: (taskProgress: WebgptTaskProgress) => void,
): Promise<CreateNewWallpaperResult> {
    const { author, wallpaperImage } = request;

    const { wallpaperUrl, colorStats, originalSize, wallpaperPrompt, contentWithFont } = await (wallpaperImage
        ? createNewWallpaper_prepareFromImage(request, onProgress)
        : createNewWallpaper_prepareFromIdea(request, onProgress));

    await onProgress({
        name: 'finishing',
        title: 'Finishing',
        isDone: false,
        // Note: No need to end this task, because it is the last one and will be ended by navigation to new page
    });
    const newWallpaper = addWallpaperComputables({
        parent: null,
        author,
        isPublic: false,
        src: wallpaperUrl,
        prompt: wallpaperPrompt,
        colorStats,
        naturalSize:
            originalSize /* <- TODO: [🧠] Make naming more clear, what means `naturalSize` and what `originalSize`? */,
        content: contentWithFont,
        saveStage: 'SAVING',
    });

    const insertResult = await getSupabaseForWorker().from('Wallpaper').insert(serializeWallpaper(newWallpaper));

    // TODO: !! Util isInsertSuccessfull (status===201)
    console.info({ newWallpaper, insertResult });

    return { wallpaperId: newWallpaper.id };
}

/**
 * TODO: [🥩] Make version just without prompting
 * TODO: !! Save wallpaperDescription in wallpaper (and maybe whole Azure response)
 * TODO: This function should not know anything that she runs in a worker (getSupabaseForWorker)
 * TODO: `author` must be valid client ID and same as `clientId`
 */
