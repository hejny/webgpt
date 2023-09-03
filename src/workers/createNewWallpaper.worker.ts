import { Vector } from 'xyzt';
import { COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND, IMAGE_NATURAL_SIZE } from '../../config';
import { TaskProgress } from '../components/TaskInProgress/task/TaskProgress';
import { UploadWallpaperResponse } from '../pages/api/custom/upload-wallpaper-image';
import { WriteWallpaperContentResponse } from '../pages/api/custom/write-wallpaper-content';
import { WriteWallpaperPromptResponse } from '../pages/api/custom/write-wallpaper-prompt';
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
    const { author, wallpaperImage: wallpaperImageAsBlob } = options;

    //===========================================================================
    //-------[ Local image analysis: ]---
    await onProgress({
        name: 'image-analysis',
        title: 'Color analysis',
        isDone: false,
        // TODO: Make it more granular
    });

    const wallpaperImage = await createImageBitmap(wallpaperImageAsBlob);
    const naturalSize = new Vector(wallpaperImage.width, wallpaperImage.height);

    // TODO: !!! Detect Aspect Ratio and warn if it is more than 16:9 (put in config)

    const wallpaperResizedCanvas = await createOffscreenCanvas(
        wallpaperImage,
        // TODO: !!! Preserve Aspect Ratio of the wallpaper when scaling
        IMAGE_NATURAL_SIZE.scale(1) /* <- TODO: [🧔] This should be in config */,
    );
    const wallpaperResizedBlob = await wallpaperResizedCanvas.convertToBlob();
    const compute = COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND;
    const image = await createImageInWorker(
        // TODO: [👱‍♀️] It is inefficient pass here blob which will be internally converted to OffscreenCanvas which is aviablie already here
        wallpaperResizedBlob,
        IMAGE_NATURAL_SIZE.scale(0.1) /* <- TODO: This should be exposed as compute.preferredSize */,
    );
    const colorStats = await compute(image, onProgress);
    await onProgress({
        name: 'image-analysis',
        isDone: true,
    });
    console.info({ colorStats });
    //-------[ / Local image analysis ]---
    //===========================================================================
    //-------[ Upload image: ]---
    await onProgress({
        name: 'upload-wallpaper-image',
        title: 'Uploading image',
        isDone: false,
        // TODO: Make it more granular
    });
    const formData = new FormData();
    formData.append('wallpaper', wallpaperResizedBlob /* <- [🧔] */);

    const response1 /* <-[💩] */ = await fetch('/api/custom/upload-wallpaper-image', {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(60000 /* <- TODO: Maybe in sync with vercel.json */),
    });

    if (response1.ok === false) {
        throw new Error(`Upload wallpaper failed with status ${response1.status}`);
    }

    const { wallpaperUrl } = (await response1.json()) as UploadWallpaperResponse;
    await onProgress({
        name: 'upload-wallpaper-image',
        isDone: true,
    });
    console.info({ wallpaperUrl });
    //-------[ /Upload image ]---
    //===========================================================================
    //-------[ Write description: ]---
    await onProgress({
        name: 'write-wallpaper-prompt',
        title: 'Content analysis',
        isDone: false,
        // TODO: Make it more granular
    });

    const response2 /* <-[💩] */ = await fetch('/api/custom/write-wallpaper-prompt', {
        method: 'POST',
        body: JSON.stringify({ wallpaperUrl }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(60000 /* <- TODO: Maybe in sync with vercel.json */),
    });

    if (response2.ok === false) {
        throw new Error(`Content analysis failed with status ${response2.status}`);
    }

    const { wallpaperDescription } = (await response2.json()) as WriteWallpaperPromptResponse;
    await onProgress({
        name: 'write-wallpaper-prompt',
        isDone: true,
    });

    console.info({ wallpaperDescription });
    //-------[ /Write description ]---
    //===========================================================================
    //-------[ Write content: ]---
    await onProgress({
        name: 'write-wallpaper-content',
        title: 'Copywriting',
        isDone: false,
        // TODO: Make it more granular
    });

    const response3 /* <-[💩] */ = await fetch('/api/custom/write-wallpaper-content', {
        method: 'POST',
        body: JSON.stringify({ wallpaperDescription }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(60000 /* <- TODO: Maybe in sync with vercel.json */),
    });

    if (response3.ok === false) {
        throw new Error(`Copywriting failed with status ${response3.status}`);
    }

    const { wallpaperContent } = (await response3.json()) as WriteWallpaperContentResponse;
    await onProgress({
        name: 'write-wallpaper-content',
        isDone: true,
    });

    console.info({ wallpaperContent });
    //-------[ /Write content ]---
    //===========================================================================
    //-------[ Save: ]---
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
        prompt: wallpaperDescription,
        colorStats,
        naturalSize,
        content: wallpaperContent,
        saveStage: 'SAVING',
    });

    const insertResult = await getSupabaseForWorker().from('Wallpaper').insert(serializeWallpaper(newWallpaper));

    // TODO: !! Util isInsertSuccessfull (status===201)
    console.info({ newWallpaper, insertResult });
    //-------[ /Save ]---
    //===========================================================================
    return newWallpaper;
}

/**
 * TODO: [🥙] Wrap function as worker util
 * TODO: !! Save wallpaperDescription in wallpaper (and maybe whole Azure response)
 * TODO: !! getSupabaseForWorker
 * TODO: [👱‍♀️] Compute in parallel
 * TODO: [🚵‍♂️] !! Do this out of the worker just in simple utility function
 */
