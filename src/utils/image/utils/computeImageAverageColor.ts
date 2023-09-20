import { Color } from '../../color/Color';
import { forARest } from '../../forARest';
import type { WithTake } from '../../take/interfaces/ITakeChain';
import type { IComputeColorstatsWork } from '../IComputeColorstatsWork';
import type { IImage } from '../IImage';

/**
 * Computes the average color of an image
 *
 *
 * @param {IImage} image - The image object.
 * @returns {Promise<WithTake<Color>>} The promise that resolves with the average color.
 */
export async function computeImageAverageColor(image: IImage): Promise<WithTake<Color>> {
    let red = 0;
    let green = 0;
    let blue = 0;
    let alpha = 0;

    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            const pixel = image.getPixel({ x, y });
            red += pixel.red;
            green += pixel.green;
            blue += pixel.blue;
            alpha += pixel.alpha;

            await forARest<IComputeColorstatsWork>('computeImageAverageColor');
        }
    }

    const pixelCount = image.width * image.height;

    return Color.fromValues(
        Math.round(red / pixelCount),
        Math.round(green / pixelCount),
        Math.round(blue / pixelCount),
        Math.round(alpha / pixelCount),
    );
}
