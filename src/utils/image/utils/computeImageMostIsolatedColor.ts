import { Color } from '../../color/Color';
import { areColorsEqual } from '../../color/utils/areColorsEqual';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';

/**
 * @@@
 * 
 * NOT used - too slow
 */
export function computeImageMostIsolatedColor(image: IImage): WithTake<Color> {
    // Create a 2D array to keep track of visited pixels
    const visited = new Array(image.width).fill(null).map(() => new Array(image.height).fill(false));

    const colors = {}; // Object to keep track of the count of each color

    // Count the number of occurrences of each color in the image
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            const color = image.getPixel({ x, y });
            const key = `${color.red}-${color.green}-${color.blue}`;
            if (!colors.hasOwnProperty(key)) {
                (colors as any)[key] = 0;
            }
            (colors as any)[key]++;
        }
    }

    let mostIsolatedColor: WithTake<Color> | null = null;
    let minDistance = Infinity;

    // For each color in the image
    for (const key in colors) {
        if (colors.hasOwnProperty(key)) {
            const parts = key.split('-');
            const red = parseInt(parts[0]);
            const green = parseInt(parts[1]);
            const blue = parseInt(parts[2]);
            const color = Color.fromValues(red, green, blue);

            // Use BFS to find the distance to the nearest pixel with a different color
            const queue: Array<{ x: number; y: number }> = [];
            for (let x = 0; x < image.width; x++) {
                for (let y = 0; y < image.height; y++) {
                    if (areColorsEqual(color, image.getPixel({ x, y }))) {
                        queue.push({ x, y });
                    }
                }
            }

            let distance = Infinity;
            while (queue.length > 0) {
                const { x, y } = queue.shift()!;
                if (x < 0 || x >= image.width || y < 0 || y >= image.height || visited[x][y]) {
                    continue;
                }
                visited[x][y] = true;
                const pixelColor = image.getPixel({ x, y });
                if (!areColorsEqual(color, pixelColor)) {
                    distance = Math.min(
                        distance,
                        Math.abs(x - Math.floor(image.width / 2)) + Math.abs(y - Math.floor(image.height / 2)),
                    );
                } else {
                    queue.push({ x: x - 1, y });
                    queue.push({ x: x + 1, y });
                    queue.push({ x, y: y - 1 });
                    queue.push({ x, y: y + 1 });
                }
            }

            // Update mostIsolatedColor and minDistance if necessary
            if (distance < minDistance) {
                mostIsolatedColor = color;
                minDistance = distance;
            }
        }
    }

    /*
    if (mostIsolatedColor === null) {
        throw new Error('Image has no pixels');
    }
    */

    return mostIsolatedColor! /* <- !!! */;
}
