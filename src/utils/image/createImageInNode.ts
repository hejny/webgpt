import { readFile } from 'fs/promises';
import { Vector } from 'xyzt';
import { Color } from '../color/Color';
import { Image } from './Image';

export async function createImageInNode(path: string): Promise<Image> {
    // Read the file from the given path as a buffer
    const buffer = await readFile(path);

    // Get the width and height of the image from the buffer
    // Assuming the buffer is in PNG format
    // See https://www.w3.org/TR/PNG/#11IHDR for details
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);

    // Create an image object with the given size
    const image = new Image(new Vector(width, height), Color.fromHex('#000000'));

    // Loop through all the pixels of the buffer and set their color in the image object
    // Assuming the buffer is in RGBA format
    // See https://www.w3.org/TR/PNG/#6Colour-values for details
    for (let i = 0; i < image.size.y; i++) {
        for (let j = 0; j < image.size.x; j++) {
            // Get the index of the pixel in the buffer
            // Skipping the first 33 bytes of the PNG header and CRC
            const index = 33 + (i * image.size.x + j) * 4;

            // Get the red, green, blue and alpha values of the pixel from the buffer
            const red = buffer[index];
            const green = buffer[index + 1];
            const blue = buffer[index + 2];
            const alpha = buffer[index + 3] / 255;

            // Create a color object from the pixel values
            const color = new Color(red, green, blue, alpha);

            // Set the color of the pixel in the image object
            image.setPixel({ x: j, y: i }, color);
        }
    }

    // Return the image object as a promise
    return Promise.resolve(image);
}
