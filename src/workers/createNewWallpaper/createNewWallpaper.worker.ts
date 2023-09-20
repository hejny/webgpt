import { spaceTrim } from 'spacetrim';
import {
    COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND,
    WALLPAPER_IMAGE_ASPECT_RATIO_ALLOWED_RANGE,
    WALLPAPER_IMAGE_MAX_ALLOWED_SIZE,
} from '../../../config';
import { promptDialogue } from '../../components/Dialogues/dialogues/promptDialogue';
import type { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';
import { UploadWallpaperResponse } from '../../pages/api/custom/upload-wallpaper-image';
import type { WriteWallpaperContentResponse } from '../../pages/api/custom/write-wallpaper-content';
import type { WriteWallpaperPromptResponse } from '../../pages/api/custom/write-wallpaper-prompt';
import { addWallpaperComputables } from '../../utils/addWallpaperComputables';
import { aspectRatioRangeExplain } from '../../utils/aspect-ratio/aspectRatioRangeExplain';
import { downscaleWithAspectRatio } from '../../utils/aspect-ratio/downscaleWithAspectRatio';
import { isInAspectRatioRange } from '../../utils/aspect-ratio/isInAspectRatioRange';
import { serializeWallpaper } from '../../utils/hydrateWallpaper';
import { createImageInWorker } from '../../utils/image/createImageInWorker';
import { measureImageBlob } from '../../utils/image/measureImageBlob';
import { resizeImageBlob } from '../../utils/image/resizeImageBlob';
import { getSupabaseForWorker } from '../../utils/supabase/getSupabaseForWorker';
import {
    createNewWallpaperWorkerify,
    ICreateNewWallpaperRequest,
    ICreateNewWallpaperResult,
} from './createNewWallpaper.common';

createNewWallpaperWorkerify.runWorker(createNewWallpaperExecutor);

/**
 * @private within this folder
 *
 * TODO: Maybe put in separate file and make public as createNewWallpaperForServer / createNewWallpaperForNode
 */
async function createNewWallpaperExecutor(
    request: ICreateNewWallpaperRequest,
    onProgress: (taskProgress: TaskProgress) => void,
): Promise<ICreateNewWallpaperResult> {
    const { author, wallpaperImage: wallpaper } = request;
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
        // TODO: [🈵] If 4XX error, show also the message from json body
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

    if (originalSize.x > WALLPAPER_IMAGE_MAX_ALLOWED_SIZE.x || originalSize.y > WALLPAPER_IMAGE_MAX_ALLOWED_SIZE.y) {
        naturalSize = downscaleWithAspectRatio(originalSize, WALLPAPER_IMAGE_MAX_ALLOWED_SIZE);
    }

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

    await onProgress({
        name: 'image-resize',
        isDone: true,
    });
    //-------[ / Image resize ]---
    //===========================================================================
    //-------[ Color analysis: ]---

    const colorStatsPromise = /* not await */ createImageInWorker(wallpaperForColorAnalysis).then(
        (imageForColorAnalysis) =>
            computeColorstats(
                imageForColorAnalysis,
                onProgress /* <- Note: computeColorstats will show its own tasks */,
            ),
    );
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
        // TODO: [🈵] If 4XX error, show also the message from json body
        throw new Error(`Content analysis failed with status ${response2.status}`);
    }

    const { wallpaperDescription } = (await response2.json()) as WriteWallpaperPromptResponse;
    console.info({ wallpaperDescription });
    await onProgress({
        name: 'write-wallpaper-prompt',
        isDone: true,
    });

    //-------[ /Write description ]---
    //===========================================================================
    //-------[ Modify Web Assigment: ]---

    // TODO: Should be here onProgress task?
    const wallpaperAssigment = await promptDialogue({
        prompt: `What is your web about?`,
        defaultValue: wallpaperDescription,
        placeholder: `Describe your web` /* <- TODO: Better and maybe with rotation */,
        isCloseable: false,
        autoSubmit: 5000 /* <- TODO: To config */,
    });
    console.info({ wallpaperAssigment });
    //-------[ /Modify Web Assigment ]---
    //===========================================================================
    //-------[ Write content: ]---
    await onProgress({
        name: 'write-wallpaper-content',
        title: 'Copywriting',
        isDone: false,
        // TODO: Make it more granular
    });

    const response3 /* <-[💩] */ = await fetch(
        `/api/custom/write-wallpaper-content?clientId=${author /* <- TODO: Pass as clientId */}`,
        {
            method: 'POST',
            body: JSON.stringify({ wallpaperAssigment }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(60000 /* <- TODO: Maybe in sync with vercel.json */),
        },
    );

    if (response3.ok === false) {
        // TODO: [🈵] If 4XX error, show also the message from json body
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
        colorStats: await colorStatsPromise,
        naturalSize: originalSize,
        content: wallpaperContent,
        saveStage: 'SAVING',
    });

    const insertResult = await getSupabaseForWorker().from('Wallpaper').insert(serializeWallpaper(newWallpaper));

    // TODO: !! Util isInsertSuccessfull (status===201)
    console.info({ newWallpaper, insertResult });
    //-------[ /Save ]---
    //===========================================================================

    return { wallpaperId: newWallpaper.id };
}

/**
 * TODO: [🥩] Make version just without prompting
 * TODO: !! Save wallpaperDescription in wallpaper (and maybe whole Azure response)
 * TODO: !! getSupabaseForWorker
 * TODO: [🚵‍♂️] !! Do this out of the worker just in simple utility function
 * TODO: Alert dialogues from worker
 */
