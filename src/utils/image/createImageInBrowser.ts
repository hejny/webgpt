import { Color } from '../color/Color';
import { string_url } from '../typeAliases';
import { Image as MyImage } from './Image';
import { forARest } from './utils/forARest';

/**
 * Define an async function to create an image in the browser
 *
 * @param path The path to the image file or the URL of the image
 *
 * @see https://sharegpt.com/c/dgsbrS9
 */
export async function createImageInBrowser(src: string_url): Promise<MyImage> {
    return new Promise((resolve, reject) => {
        // Create an HTML image element
        const img = new Image();

        img.crossOrigin = 'anonymous';

        // Set the source of the image to the given path
        img.src = src;

        // Once the image is loaded, perform the necessary operations
        img.onload = async () => {
            // Get the width and height of the image
            const width = img.width;
            const height = img.height;

            // Create an image object with the given size
            const image = new MyImage({ x: width, y: height });

            // Create a canvas element
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            // Get the 2D rendering context of the canvas
            const context = canvas.getContext('2d');

            if (!context) {
                throw new Error(`Could not get the 2D rendering context of the canvas`);
            }

            // Draw the image on the canvas
            context.drawImage(img, 0, 0);

            // Get the pixel data from the canvas
            const imageData = context.getImageData(0, 0, width, height).data;

            // Loop through all the pixels of the image and set their color in the image object
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    // Calculate the index of the pixel in the image data array
                    const index = (y * width + x) * 4;

                    // Get the RGBA values of the pixel
                    const r = imageData[index];
                    const g = imageData[index + 1];
                    const b = imageData[index + 2];
                    const a = imageData[index + 3];

                    // Convert the RGBA values to a hex string
                    const hex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;

                    // Convert the hex value to a Color object using Color.fromHex()
                    const color = Color.fromHex(hex);

                    // Set the color of the pixel in the image object
                    image.setPixel({ x, y }, color);

                    await forARest();
                }
            }

            // Resolve the promise with the image object
            resolve(image);
        };

        // If there's an error loading the image, reject the promise
        img.onerror = (error) => {
            reject(error);
        };
    });
}
