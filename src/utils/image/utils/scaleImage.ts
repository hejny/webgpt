import { IVector } from 'xyzt';
import { Color } from '../../color/Color';
import { forARest } from '../../forARest';
import { IComputeColorstatsWork } from '../IComputeColorstatsWork';
import { IImage } from '../IImage';
import { Image } from '../Image';

/**
 * Scales an image to a new size
 *
 * Note: When the new size is the same as the original size, the original image is returned
 *
 * @param {IImage} image - The original image to scale.
 * @param {IVector} newSize - The new size of the image.
 * @returns {Image} The scaled image.
 */
export async function scaleImage(image: IImage, newSize: IVector): Promise<Image> {
    if (image.size.x === newSize.x && image.size.y === newSize.y && image instanceof Image) {
        console.info('🍃 No need to scale image');
        return image;
    }

    const newImage = new Image(newSize);

    for (let y = 0; y < newSize.y!; y++) {
        for (let x = 0; x < newSize.x!; x++) {
            const oldX = (x * image.width) / newImage.width;
            const oldY = (y * image.height) / newImage.height;

            const x1 = Math.floor(oldX);
            const y1 = Math.floor(oldY);
            const x2 = Math.floor(oldX);
            const y2 = Math.floor(oldY);

            const q11 = image.getPixel({ x: x1, y: y1 });
            const q12 = image.getPixel({ x: x1, y: y2 });
            const q21 = image.getPixel({ x: x2, y: y1 });
            const q22 = image.getPixel({ x: x2, y: y2 });

            const pixel = interpolate(q11, q12, q21, q22, oldX - x1, oldY - y1);
            newImage.setPixel({ x, y }, pixel);

            await forARest<IComputeColorstatsWork>('scaleImage');
        }
    }

    return newImage;
}

/**
 * Interpolates between four colors to calculate a new color
 *
 * @param {Color} q11 - The top-left color.
 * @param {Color} q12 - The bottom-left color.
 * @param {Color} q21 - The top-right color.
 * @param {Color} q22 - The bottom-right color.
 * @param {number} x - The x-coordinate of the target pixel.
 * @param {number} y - The y-coordinate of the target pixel.
 * @returns {Color} The interpolated color.
 */
function interpolate(q11: Color, q12: Color, q21: Color, q22: Color, x: number, y: number): Color {
    /**
     * Interpolates between two color channels
     *
     * @param {number} c1 - The channel value of the top-left color.
     * @param {number} c2 - The channel value of the bottom-left color.
     * @param {number} c3 - The channel value of the top-right color.
     * @param {number} c4 - The channel value of the bottom-right color.
     * @param {number} x - The x-coordinate of the target pixel.
     * @param {number} y - The y-coordinate of the target pixel.
     * @returns {number} The interpolated channel value.
     */
    const interpolateChannel = (c1: number, c2: number, c3: number, c4: number, x: number, y: number): number => {
        const t = x * (1 - y);
        const u = x * y;
        return Math.round(c1 * (1 - t) * (1 - u) + c2 * t * (1 - u) + c3 * (1 - t) * u + c4 * t * u);
    };

    const r = interpolateChannel(q11.r, q12.r, q21.r, q22.r, x, y);
    const g = interpolateChannel(q11.g, q12.g, q21.g, q22.g, x, y);
    const b = interpolateChannel(q11.b, q12.b, q21.b, q22.b, x, y);
    const a = interpolateChannel(q11.a, q12.a, q21.a, q22.a, x, y);

    return Color.fromValues(r, g, b, a);
}

/**
 * TODO: Maybe implement via avarage https://sharegpt.com/c/me0ZGD2
 * TODO: Work internally with IVector and mix color operator
 * Note: [🚇] We do not need alpha channel for this application
 * TODO: !! ACRY apply [🚇]
 */
