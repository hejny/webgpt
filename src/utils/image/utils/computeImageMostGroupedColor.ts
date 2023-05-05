import { Color } from '../../color/Color';
import { areColorsEqual } from '../../color/utils/areColorsEqual';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';

/**
 * @@@
 */
export function computeImageMostGroupedColor(image: IImage): WithTake<Color> {
    // Create a 2D array to keep track of visited pixels
    const visited = new Array(image.width).fill(null).map(() => new Array(image.height).fill(false));

    let mostGroupedColor: WithTake<Color> | null = null;
    let maxGroupSize = 0;

    // For each pixel in the image
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            if (visited[x][y]) {
                continue;
            }

            // Use BFS to find the size of the group of pixels with the same color as the current pixel
            const color = image.getPixel({ x, y });
            const queue = [{ x, y }];
            let groupSize = 0;

            while (queue.length > 0) {
                const { x, y } = queue.shift()!;
                if (x < 0 || x >= image.width || y < 0 || y >= image.height || visited[x][y]) {
                    continue;
                }
                visited[x][y] = true;
                const pixelColor = image.getPixel({ x, y });
                if (areColorsEqual(color, pixelColor)) {
                    groupSize++;
                    queue.push({ x: x - 1, y });
                    queue.push({ x: x + 1, y });
                    queue.push({ x, y: y - 1 });
                    queue.push({ x, y: y + 1 });
                }
            }

            // Update mostGroupedColor and maxGroupSize if necessary
            if (groupSize > maxGroupSize) {
                mostGroupedColor = color;
                maxGroupSize = groupSize;
            }
        }
    }

    if (mostGroupedColor === null) {
        throw new Error('Image has no pixels');
    }

    return mostGroupedColor;
}
