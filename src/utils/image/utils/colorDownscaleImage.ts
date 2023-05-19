import { Color } from '../../color/Color';
import { IImage } from '../IImage';
import { Image } from '../Image';

/**
 * @@@
 */
export function colorDownscaleImage(image: IImage, numberOfColors: number): Image {
    return image.map((color) => {
        let { red, green, blue /* [🚇], alpha */ } = color.clone(); /* <- TODO: Color should have map property */

        function downscaleValue(value: number): number {
            return Math.round((value * (numberOfColors - 1)) / 255) * (255 / (numberOfColors - 1));
        }

        red = downscaleValue(red);
        green = downscaleValue(green);
        blue = downscaleValue(blue);
        // [🚇] alpha = downscaleValue(alpha);

        return Color.fromValues(red, green, blue /* [🚇], alpha */);
    }) as Image;
}

/**
 * TODO: Do some smart scaling then nearest neighbor
 */
