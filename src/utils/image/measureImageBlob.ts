import { Vector } from 'xyzt';

/**
 * Measures the size of an image
 *
 * @param image image to measure as blob
 * @returns size of image as vector of width and height
 */
export async function measureImageBlob(image: Blob): Promise<Vector> {
    const wallpaperImage = await createImageBitmap(image);
    return new Vector(wallpaperImage.width, wallpaperImage.height);
}
