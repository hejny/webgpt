import { IVector } from 'xyzt';

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
 * TODO: !!! It should not upscale ONLY downscale
 */
