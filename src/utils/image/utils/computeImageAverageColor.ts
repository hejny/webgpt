import { Color } from '../../color/Color';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';

/**
 * @@@
 */
export function computeImageAverageColor(image: IImage): WithTake<Color> {
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
