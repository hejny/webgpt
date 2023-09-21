import type { IVector } from 'xyzt';

/**
 * Resizes an image to a new size
 *
 * Note: The function will NOT preserve the aspect ratio of the image.
 *       If you want to preserve the aspect ratio, use downscaleWithAspectRatio to compute newSize before calling this function.
 *
 * @param image image to measure as blob
 * @param newSize preferred size of the image
 * @returns image as blob with the new size
 */
export async function resizeImageBlob(image: Blob, newSize: IVector): Promise<Blob> {
    const imageBitmap = await createImageBitmap(image);

    // Create an OffscreenCanvas object
    const canvas = new OffscreenCanvas(newSize.x!, newSize.y!);

    // Get the 2D rendering context of the canvas
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error(`Could not get the 2D rendering context of the canvas`);
    }

    // Draw the image on the canvas
    context.drawImage(
        imageBitmap,
        0, //                  <- source      x
        0, //                  <- source      y
        imageBitmap.width, //  <- source      x size
        imageBitmap.height, // <- source      y size
        0, //                  <- destination x
        0, //                  <- destination y
        newSize.x!, //         <- destination x size
        newSize.y!, //         <- destination y size
    );

    return await canvas.convertToBlob();
}

/**
 * TODO: !! Return same image if the size is the same
 * TODO: !! It should not upscale ONLY downscale
 */
