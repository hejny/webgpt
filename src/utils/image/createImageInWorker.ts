import { IVector } from 'xyzt';
import { forARest } from '../../components/TaskInProgress/forARest';
import { Color } from '../color/Color';
import { IComputeColorstatsWork } from './IComputeColorstatsWork';
import { Image as MyImage } from './Image';

/**
 * Create new Image from Blob in the browser or worker
 */
export async function createImageInWorker(imageAsBlob: Blob, preferredSize: IVector): Promise<MyImage> {
    const imageBitmap = await createImageBitmap(imageAsBlob);
    const width = imageBitmap.width;
    const height = imageBitmap.height;

    // Create an image object with the given size
    const image = new MyImage({ x: preferredSize.x!, y: preferredSize.y! });

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
        0, //                <- source      x
        0, //                <- source      y
        width, //            <- source      x size
        height, //           <- source      y size
        0, //                <- destination x
        0, //                <- destination y
        preferredSize.x!, // <- destination x size
        preferredSize.y!, // <- destination y size
    );

    // Get the pixel data from the canvas
    const imageData = context.getImageData(0, 0, preferredSize.x!, preferredSize.y!).data;

    // Loop through all the pixels of the image and set their color in the image object
    for (let y = 0; y < preferredSize.y!; y++) {
        for (let x = 0; x < preferredSize.x!; x++) {
            // Calculate the index of the pixel in the image data array
            const index = (y * preferredSize.x! + x) * 4;

            // Get the RGBA values of the pixel
            const r = imageData[index]!;
            const g = imageData[index + 1]!;
            const b = imageData[index + 2]!;
            const a = imageData[index + 3]!;

            // Convert the RGBA values to a hex string
            const hex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;

            // Convert the hex value to a Color object using Color.fromHex()
            const color = Color.fromHex(hex);

            // Set the color of the pixel in the image object
            image.setPixel({ x, y }, color);

            await forARest<IComputeColorstatsWork>('createImageInWorker');
        }
    }

    return image;
}

/**
 * TODO: [👱‍♀️] Use Internally createOffscreenCanvas
 * TODO: [🧠] Better names createImageInWorker can be really used in browser THE difference is wheather it takes src url or blob
 */
