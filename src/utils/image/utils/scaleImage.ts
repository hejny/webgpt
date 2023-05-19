import { IVector } from 'xyzt';
import { Color } from '../../color/Color';
import { Image } from '../Image';

/**
 * @@@
 */
export function scaleImage(image: Image, newSize: IVector): Image {
    if (image.size.x === newSize.x && image.size.y === newSize.y) {
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
        }
    }

    return newImage;
}

/**
 * @@@
 */
function interpolate(q11: Color, q12: Color, q21: Color, q22: Color, x: number, y: number): Color {
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
 * TODO: !!!! ACRY apply [🚇]
 */
