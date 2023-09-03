import { Vector } from 'xyzt';

export async function measureImageBlob(image: Blob): Promise<Vector> {
    const wallpaperImage = await createImageBitmap(image);
    return new Vector(wallpaperImage.width, wallpaperImage.height);
}

/**
 * TODO: !!! Annotate all new functions with JSDoc in the branch
 * TODO: It should not upscale ONLY downscale
 */
