import { Color, string_color } from '../../color/Color';
import { forARest } from './forARest';

/**
 * @@@
 */

export async function getImageUniqueColors(image: IImage): Promise<Set<WithTake<Color>>> {
    const colors = new Set<string_color>();

    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            colors.add(image.getPixel({ x, y }).toHex());
            await forARest();
        }
    }

    return new Set(Array.from(colors).map((color) => Color.fromHex(color)));
}
