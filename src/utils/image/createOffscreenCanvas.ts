import { IVector } from 'xyzt';

/**
 * Create new OffscreenCanvas from Blob + resize to preferredSize
 */
export async function createOffscreenCanvas(imageAsBlob: Blob, preferredSize: IVector): Promise<OffscreenCanvas> {
    const imageBitmap = await createImageBitmap(imageAsBlob);

    // Create an OffscreenCanvas object
    const canvas = new OffscreenCanvas(preferredSize.x!, preferredSize.y!);

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
        preferredSize.x!, //   <- destination x size
        preferredSize.y!, //   <- destination y size
    );

    return canvas;
}

/**
 * TODO: It should not upscale ONLY downscale
 */
