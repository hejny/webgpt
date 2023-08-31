import { COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND, IMAGE_NATURAL_SIZE } from '../../config';
import { TaskProgress } from '../components/TaskInProgress/task/TaskProgress';
import { UploadWallpaperResponse } from '../pages/api/upload-wallpaper';
import { addWallpaperComputables } from '../utils/addWallpaperComputables';
import { serializeWallpaper } from '../utils/hydrateWallpaper';
import { createImageInWorker } from '../utils/image/createImageInWorker';
import { createOffscreenCanvas } from '../utils/image/createOffscreenCanvas';
import { getSupabaseForWorker } from '../utils/supabase/getSupabaseForWorker';
import { string_wallpaper_id, uuid } from '../utils/typeAliases';

export interface IMessage_CreateNewWallpaper_Request {
    type: 'CREATE_NEW_WALLPAPER_REQUEST';
    author: uuid;
    wallpaperImage: Blob;
}

export interface IMessage_CreateNewWallpaper_Progress {
    type: 'CREATE_NEW_WALLPAPER_PROGRESS';
    taskProgress: TaskProgress;
}

export interface IMessage_CreateNewWallpaper_Result {
    type: 'CREATE_NEW_WALLPAPER_RESULT';
    wallpaperId: string_wallpaper_id;
}

export interface IMessage_CreateNewWallpaper_Error {
    type: 'CREATE_NEW_WALLPAPER_ERROR';
    message: string;
}

addEventListener('message', async (event: MessageEvent<IMessage_CreateNewWallpaper_Request>) => {
    // COLORSTATS_COMPUTE_METHODS
    const { author, wallpaperImage } = event.data;

    try {
        const newWallpaper = await createNewWallpaper({ author, wallpaperImage }, (taskProgress: TaskProgress) => {
            postMessage({
                type: 'CREATE_NEW_WALLPAPER_PROGRESS',
                taskProgress,
            } satisfies IMessage_CreateNewWallpaper_Progress);
        });

        postMessage({
            type: 'CREATE_NEW_WALLPAPER_RESULT',
            wallpaperId: newWallpaper.id,
        } satisfies IMessage_CreateNewWallpaper_Result);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        console.error(error);
        postMessage({
            type: 'CREATE_NEW_WALLPAPER_ERROR',
            message: error.message,
        } satisfies IMessage_CreateNewWallpaper_Error);
    }
});

async function createNewWallpaper(
    options: Omit<IMessage_CreateNewWallpaper_Request, 'type'>,
    onProgress: (taskProgress: TaskProgress) => void,
) {
    const { author, wallpaperImage } = options;

    //-------[ Local image analysis: ]---
    performance.mark('image-analysis-start');
    await onProgress({
        name: 'image-analysis',
        title: 'Image analysis',
        isDone: false,
        // TODO: Make it more granular
    });

    const wallpaperResizedCanvas = await createOffscreenCanvas(
        wallpaperImage,
        IMAGE_NATURAL_SIZE.scale(0.2) /* <- TODO: [🧔] This should be in config */,
    );
    const wallpaperResizedBlob = await wallpaperResizedCanvas.convertToBlob();
    const compute = COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND;
    const image = await createImageInWorker(
        // TODO: [👱‍♀️] It is inefficient pass here blob which will be internally converted to OffscreenCanvas which is aviablie already here
        wallpaperResizedBlob,
        IMAGE_NATURAL_SIZE.scale(0.1) /* <- TODO: This should be exposed as compute.preferredSize */,
    );
    const colorStats = await compute(image, onProgress);
    performance.mark('image-analysis-end');
    performance.measure('image-analysis', 'image-analysis-start', 'image-analysis-end');
    await onProgress({
        name: 'image-analysis',
        title: 'Image analysis',
        isDone: true,
    });
    console.info({ colorStats });
    //-------[ / Local image analysis ]---

    //-------[ Upload image: ]---
    performance.mark('upload-image-and-write-content-start');
    await onProgress({
        name: 'image-upload',
        title: 'Writing content',
        isDone: false,
        // TODO: Make it more granular
    });
    const formData = new FormData();
    formData.append('wallpaper', wallpaperResizedBlob /* <- [🧔] */);

    const response = await fetch('/api/upload-wallpaper', {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(60000),
    });

    if (response.ok === false) {
        throw new Error(`Upload wallpaper failed with status ${response.status}`);
    }

    const { wallpaperUrl, wallpaperDescription, wallpaperContent } = (await response.json()) as UploadWallpaperResponse;
    performance.mark('upload-image-and-write-content-end');
    performance.measure(
        'upload-image-and-write-content',
        'upload-image-and-write-content-start',
        'upload-image-and-write-content-end',
    );
    await onProgress({
        name: 'image-upload',
        title: 'Writing content',
        isDone: true,
    });
    console.info({ wallpaperUrl, wallpaperDescription, wallpaperContent });
    //-------[ /Upload image ]---

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
        prompt: null,
        colorStats,
        content: wallpaperContent,
        saveStage: 'SAVING',
    });

    const insertResult = await getSupabaseForWorker().from('Wallpaper').insert(serializeWallpaper(newWallpaper));

    // TODO: !! Util isInsertSuccessfull (status===201)
    console.info({ newWallpaper, insertResult, performance: performance.getEntries() });

    return newWallpaper;
}

/**
 * TODO: [🥙] Wrap function as worker util
 * TODO: !! Save wallpaperDescription in wallpaper (and maybe whole Azure response)
 * TODO: !! getSupabaseForWorker
 * TODO: [👱‍♀️] Compute in parallel
 * TODO: [🚵‍♂️] !! Do this out of the worker just in simple utility function
 */
