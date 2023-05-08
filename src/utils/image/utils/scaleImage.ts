import { IImage } from '../IImage';
import { Image } from '../Image';

/**
 * @@@
 */
export function scaleImage(image: IImage, ratio: number): Image {
    const newSize = image.size.scale(ratio).map(Math.round);
    const newImage = new Image(newSize);

    for (let y = 0; y < newSize.y; y++) {
        for (let x = 0; x < newSize.x; x++) {
            const oldX = Math.round((x * image.width) / newImage.width);
            const oldY = Math.round((y * image.height) / newImage.height);

            newImage.setPixel({ x, y }, image.getPixel({ x: oldX, y: oldY }));
        }
    }

    return newImage;
}

/**
 * TODO: Do some smart scaling then nearest neighbor
 */
