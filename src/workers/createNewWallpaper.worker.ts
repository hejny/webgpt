import spaceTrim from 'spacetrim';
import {
    AZURE_COMPUTER_VISION_PREFERRED_SIZE,
    COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND,
    WALLPAPER_IMAGE_ASPECT_RATIO_ALLOWED_RANGE,
    WALLPAPER_IMAGE_MAX_ALLOWED_SIZE,
} from '../../config';
import { TaskProgress } from '../components/TaskInProgress/task/TaskProgress';
import { UploadWallpaperResponse } from '../pages/api/custom/upload-wallpaper-image';
import { WriteWallpaperContentResponse } from '../pages/api/custom/write-wallpaper-content';
import { WriteWallpaperPromptResponse } from '../pages/api/custom/write-wallpaper-prompt';
import { addWallpaperComputables } from '../utils/addWallpaperComputables';
import { aspectRatioRangeExplain } from '../utils/aspect-ratio/aspectRatioRangeExplain';
import { downscaleWithAspectRatio } from '../utils/aspect-ratio/downscaleWithAspectRatio';
import { isInAspectRatioRange } from '../utils/aspect-ratio/isInAspectRatioRange';
import { serializeWallpaper } from '../utils/hydrateWallpaper';
import { createImageInWorker } from '../utils/image/createImageInWorker';
import { measureImageBlob } from '../utils/image/measureImageBlob';
import { resizeImageBlob } from '../utils/image/resizeImageBlob';
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
    const { author, wallpaperImage /* <- !!! Maybe rename to just wallpaper */: wallpaper } = options;
    const computeColorstats = COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND;

    //===========================================================================
    //-------[ Image analysis and check: ]---
    await onProgress({
        name: 'image-check',
        title: 'Checking image',
        isDone: false,
    });

    /*
    Note: This is not needed because it is already checked by the measureImageBlob etc... Implement only if we want nicer error message
    if (!wallpaper.type.startsWith('image/')) {
        throw new Error(`File is not an image`);
    }
    */

    const originalSize = await measureImageBlob(wallpaper);
    let naturalSize = originalSize.clone();

    // Note: Checking first fatal problems then warnings and fixable problems (like too large image fixable by automatic resize)

    if (!isInAspectRatioRange(WALLPAPER_IMAGE_ASPECT_RATIO_ALLOWED_RANGE, originalSize)) {
        throw new Error(
            spaceTrim(
                (block) => `
                    Image has aspect ratio that is not allowed:

                    ${block(aspectRatioRangeExplain(WALLPAPER_IMAGE_ASPECT_RATIO_ALLOWED_RANGE, originalSize))}
                `,
            ),
        );
    }

    /*
    TODO: [👩‍🎨] Confirm is not working in worker - temporary disabled
    if (!isInAspectRatioRange(WALLPAPER_IMAGE_ASPECT_RATIO_RECOMMENDED_RANGE, naturalSize)) {
        const isOkToHaveNonRecommendedAspectRatio = window.confirm(
            spaceTrim(
                (block) => `
                    
                    Image has aspect ratio that is not recommended, do you want to continue?

                    ${block(aspectRatioRangeExplain(WALLPAPER_IMAGE_ASPECT_RATIO_ALLOWED_RANGE, naturalSize))}
                `,
            ),
        );
        if (!isOkToHaveNonRecommendedAspectRatio) {
            // TODO: !! Do not show this error
            throw new Error(`Image has aspect ratio that is not recommended and user did not confirm automatic resize`);
        }
    }
    */

    if (originalSize.x > WALLPAPER_IMAGE_MAX_ALLOWED_SIZE.x || originalSize.y > WALLPAPER_IMAGE_MAX_ALLOWED_SIZE.y) {
        naturalSize = downscaleWithAspectRatio(originalSize, WALLPAPER_IMAGE_MAX_ALLOWED_SIZE);
    }

    /*
    TODO: [👩‍🎨] Confirm is not working in worker - temporary disabled
    if (naturalSize.x < WALLPAPER_IMAGE_MIN_RECOMMENDED_SIZE.x || naturalSize.y < WALLPAPER_IMAGE_MIN_RECOMMENDED_SIZE.y) {
        const isOkToHaveSmallImage = window.confirm(
            spaceTrim(
                `
                    
                    Image is too small, do you want to continue?

                  
                `,
            ),
        );
        if (!isOkToHaveSmallImage) {
            // TODO: !! Do not show this error
            throw new Error(`Image is too small`);
        }
    }
    */
    await onProgress({
        name: 'image-check',
        isDone: true,
    });

    //-------[ / Image analysis and check ]---
    //===========================================================================
    //-------[ Image resize: ]---
    await onProgress({
        name: 'image-resize',
        title: 'Resizing image',
        isDone: false,
    });

    const wallpaperForUpload = await resizeImageBlob(wallpaper, naturalSize);
    const wallpaperForColorAnalysis = await resizeImageBlob(
        wallpaper,
        downscaleWithAspectRatio(naturalSize, computeColorstats.preferredSize),
    );

    // TODO: !!!last AZURE_COMPUTER_VISION_PREFERRED_SIZE+wallpaperForContentAnalysis is not used because azure is using the main image from CDN - remove by one commit at the end of the feature
    const wallpaperForContentAnalysis = await resizeImageBlob(
        wallpaper,
        downscaleWithAspectRatio(naturalSize, AZURE_COMPUTER_VISION_PREFERRED_SIZE),
    );

    await onProgress({
        name: 'image-resize',
        isDone: true,
    });
    //-------[ / Image resize ]---
    //===========================================================================
    //-------[ Color analysis: ]---

    await onProgress({
        title: 'Prepare color analysis',
        name: 'image-prepare-color-analysis',
        isDone: false,
    });
    const imageForColorAnalysis = await createImageInWorker(wallpaperForColorAnalysis);
    await onProgress({
        name: 'image-prepare-color-analysis',
        isDone: true,
    });
    const colorStats = await computeColorstats(imageForColorAnalysis, onProgress);
    console.info({ colorStats });
    //-------[ / Color analysis ]---
    //===========================================================================
    //-------[ Upload image: ]---
    await onProgress({
        name: 'upload-wallpaper-image',
        title: 'Uploading image',
        isDone: false,
        // TODO: Make it more granular
    });
    const formData = new FormData();
    formData.append('wallpaper', wallpaperForUpload);

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
        naturalSize: originalSize,
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
 * TODO: !!!last Merge into feature/heic and make here room for conversion
 * TODO: [🥙] Wrap function as worker util
 * TODO: !! Save wallpaperDescription in wallpaper (and maybe whole Azure response)
 * TODO: !! getSupabaseForWorker
 * TODO: [🚵‍♂️] !! Do this out of the worker just in simple utility function
 * TODO: Alert and confirm dialogues
 */
