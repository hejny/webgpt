import spaceTrim from 'spacetrim';
import { Vector } from 'xyzt';
import {
    COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND,
    WALLPAPER_IMAGE_ASPECT_RATIO_ALLOWED_RANGE,
    WALLPAPER_IMAGE_MAX_ALLOWED_SIZE,
} from '../../../../config';
import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
import { UploadWallpaperResponse } from '../../../pages/api/upload-image';
import { aspectRatioRangeExplain } from '../../../utils/aspect-ratio/aspectRatioRangeExplain';
import { downscaleWithAspectRatio } from '../../../utils/aspect-ratio/downscaleWithAspectRatio';
import { isInAspectRatioRange } from '../../../utils/aspect-ratio/isInAspectRatioRange';
import { createImageInWorker } from '../../../utils/image/createImageInWorker';
import { measureImageBlob } from '../../../utils/image/measureImageBlob';
import { resizeImageBlob } from '../../../utils/image/resizeImageBlob';
import { IImageColorStats } from '../../../utils/image/utils/IImageColorStats';
import { string_image_prompt, string_url_image, uuid } from '../../../utils/typeAliases';
import { imageGeneratorDialogue } from '../../dialogues/image-generator/imageGeneratorDialogue';

interface CreateNewWallpaperImageRequest {
    /**
     * Author of the wallpaper
     * Note: It must be valid client ID and same as identity of the user
     */
    readonly author: uuid;

    /**
     * Image of the wallpaper
     */
    readonly wallpaperImage?: Blob;

    /**
     * Same image as wallpaperImage
     *
     * Note: This is used to not reupload the same image if it is already uploaded on our CDN
     */
    readonly wallpaperUrl?: string_url_image;

    // TODO: !!! Annotate
    readonly wallpaperPrompt?: string_image_prompt;
}

interface CreateNewWallpaperImageResult {
    /**
     * URL of the wallpaper in our CDN
     */
    readonly wallpaperUrl: string_url_image;

    /**
     * Original size of the wallpaper
     */
    readonly originalSize: Vector;

    /**
     * Color statistics of the wallpaper
     */
    readonly colorStats: IImageColorStats<string>;
}

/**
 * Process text part for createNewWallpaper
 *
 * @private Use ONLY in createNewWallpaper
 */
export async function createNewWallpaper_image(
    request: CreateNewWallpaperImageRequest,
    onProgress: (taskProgress: WebgptTaskProgress) => void,
): Promise<CreateNewWallpaperImageResult> {
    let { author, wallpaperImage, wallpaperUrl, wallpaperPrompt } = request;
    const computeColorstats = COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND;

    if ((!wallpaperImage && !wallpaperPrompt) || (wallpaperImage && wallpaperPrompt)) {
        throw new Error('One of wallpaperImage or wallpaperPrompt must be provided BUT not both');
        //               <- TODO: [👮‍♂️] Maybe constrain this logic into CreateNewWallpaperImageRequest
        //               <- TODO: ShouldNeverHappenError
    }

    //===========================================================================
    //-------[ Image generate: ]---
    if (!wallpaperImage) {
        await onProgress({
            name: 'image-generate',
            title: 'Generating image',
            isDone: false,
        });

        if (wallpaperPrompt === undefined) {
            throw new Error('wallpaperPrompt is undefined');
            //               <- TODO: ShouldNeverHappenError
        }

        const { pickedImage: imagePromptResult } = await imageGeneratorDialogue({
            message: 'Pick the wallpaper image for your website',
            defaultImagePrompt: wallpaperPrompt!,
        });

        await onProgress({
            name: 'image-generate',
            isDone: true,
        });

        await onProgress({
            name: 'image-generate-download',
            title: 'Downloading image',
            isDone: false,
        });


        // TODO: [🧠] Is there some way to save normalized prompt to the database along the wallpaper
        //     > wallpaperPrompt = imagePromptResult.normalizedPrompt.content;

        wallpaperUrl = imagePromptResult.imageSrc;
        wallpaperImage = await fetch(wallpaperUrl).then((response) => response.blob());

        await onProgress({
            name: 'image-generate-download',
            isDone: true,
        });
    }

    //-------[ / Image generate ]---

    //===========================================================================
    //-------[ Image analysis and check: ]---

    await onProgress({
        name: 'image-check',
        title: 'Checking image',
        isDone: false,
    });

    if (!wallpaperImage) {
        throw new Error('wallpaperImage is undefined');
        //               <- TODO: ShouldNeverHappenError
    }

    /*
    Note: This is not needed because it is already checked by the measureImageBlob etc... Implement only if we want nicer error message
    if (!wallpaper.type.startsWith('image/')) {
        // TODO: [🈵] If 4XX error, show also the message from json body
        throw new Error(`File is not an image`);
    }
    */

    const originalSize = await measureImageBlob(wallpaperImage);
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

    let wallpaperForUpload: Blob;
    if (!wallpaperUrl) {
        wallpaperForUpload = await resizeImageBlob(wallpaperImage, naturalSize);
    }
    const wallpaperForColorAnalysis = await resizeImageBlob(
        wallpaperImage,
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
    if (!wallpaperUrl) {
        await onProgress({
            name: 'upload-wallpaper-image',
            title: 'Uploading image',
            isDone: false,
            // TODO: Make it more granular
        });
        const formData = new FormData();
        formData.append('wallpaper', wallpaperForUpload!);

        const response = await fetch('/api/upload-image', {
            method: 'POST',
            body: formData,
        });

        if (response.ok === false) {
            throw new Error(`Upload wallpaper failed with status ${response.status}`);
        }

        const uploadWallpaperResponse = (await response.json()) as UploadWallpaperResponse;
        wallpaperUrl = uploadWallpaperResponse.wallpaperUrl;
        await onProgress({
            name: 'upload-wallpaper-image',
            isDone: true,
        });
        console.info({ wallpaperUrl });
    }
    //-------[ /Upload image ]---
    //===========================================================================

    return { wallpaperUrl, originalSize, colorStats: await colorStatsPromise };
}

/**
 * TODO: [🧠][♒] Watermark image
 */
