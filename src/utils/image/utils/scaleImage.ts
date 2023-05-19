import { Color } from '../../color/Color';
import { IImage } from '../IImage';
import { Image } from '../Image';

/**
 * @@@
 */
export function scaleImage(image: IImage, ratio: number): Image {
    const newSize = image.size.scale(ratio).map(Math.ceil);
    const newImage = new Image(newSize);

    for (let y = 0; y < newSize.y; y++) {
        for (let x = 0; x < newSize.x; x++) {
            const startX = Math.floor(x / ratio);
            const startY = Math.floor(y / ratio);
            const endX = Math.ceil((x + 1) / ratio) - 1;
            const endY = Math.ceil((y + 1) / ratio) - 1;

            const pixel = averagePixels(image, startX, startY, endX, endY);
            newImage.setPixel({ x, y }, pixel);
        }
    }

    return newImage;
}

/**
 * @@@
 */
function averagePixels(image: IImage, startX: number, startY: number, endX: number, endY: number): Color {
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    // [🚇] let sumA = 0;
    const count = (endX - startX) * (endY - startY);

    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            const pixel = image.getPixel({ x, y });
            sumR += pixel.r;
            sumG += pixel.g;
            sumB += pixel.b;
            // [🚇] sumA += pixel.a;
        }
    }

    const avgR = Math.round(sumR / count);
    const avgG = Math.round(sumG / count);
    const avgB = Math.round(sumB / count);
    // [🚇] const avgA = Math.round(sumA / count);

    return Color.fromValues(avgR, avgG, avgB /* [🚇] , avgA*/);
}

/**
 * TODO: Work internally with IVector and mix color operator
 * Note: [🚇] We do not need alpha channel for this application
 */
