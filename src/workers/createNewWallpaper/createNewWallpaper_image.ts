import spaceTrim from 'spacetrim';
import { Vector } from 'xyzt';
import {
    COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND,
    WALLPAPER_IMAGE_ASPECT_RATIO_ALLOWED_RANGE,
    WALLPAPER_IMAGE_MAX_ALLOWED_SIZE,
} from '../../../config';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';
import { UploadWallpaperResponse } from '../../pages/api/custom/upload-wallpaper-image';
import { aspectRatioRangeExplain } from '../../utils/aspect-ratio/aspectRatioRangeExplain';
import { downscaleWithAspectRatio } from '../../utils/aspect-ratio/downscaleWithAspectRatio';
import { isInAspectRatioRange } from '../../utils/aspect-ratio/isInAspectRatioRange';
import { createImageInWorker } from '../../utils/image/createImageInWorker';
import { measureImageBlob } from '../../utils/image/measureImageBlob';
import { resizeImageBlob } from '../../utils/image/resizeImageBlob';
import { IImageColorStats } from '../../utils/image/utils/IImageColorStats';
import { string_url_image, uuid } from '../../utils/typeAliases';

interface CreateNewWallpaperImageRequest {
    /**
     * Author of the wallpaper
     * Note: It must be valid client ID and same as identity of the user
     */
    readonly author: uuid;

    /**
     * Image of the wallpaper
     */
    readonly wallpaperImage: Blob;
}

interface CreateNewWallpaperImageResult {
    /**
     * URL of the wallpaper in our CDN
     */
    wallpaperUrl: string_url_image;

    /**
     * Original size of the wallpaper
     */
    originalSize: Vector;

    /**
     * Color statistics of the wallpaper
     */
    colorStats: IImageColorStats<string>;
}

/**
 * Process text part for createNewWallpaper
 *
 * @private Use ONLY in createNewWallpaper
 */
export async function createNewWallpaper_image(
    request: CreateNewWallpaperImageRequest,
    onProgress: (taskProgress: TaskProgress) => void,
): Promise<CreateNewWallpaperImageResult> {
    const { /* TODO: Use here: author,*/ wallpaperImage: wallpaper } = request;

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

    const response = await fetch('/api/custom/upload-wallpaper-image', {
        method: 'POST',
        body: formData,
    });

    if (response.ok === false) {
        throw new Error(`Upload wallpaper failed with status ${response.status}`);
    }

    const { wallpaperUrl } = (await response.json()) as UploadWallpaperResponse;
    await onProgress({
        name: 'upload-wallpaper-image',
        isDone: true,
    });
    console.info({ wallpaperUrl });
    //-------[ /Upload image ]---
    //===========================================================================

    return { wallpaperUrl, originalSize, colorStats: await colorStatsPromise };
}
