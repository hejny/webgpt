import type { IVector, Vector } from 'xyzt';
import type { ISvgPath } from './ISvgPath';

interface IStringifySvgPathOptions {
    path: ISvgPath;
    topLeft: IVector;
}

/**
 * A function that converts an SVG path to a string
 *
 * @param {IStringifySvgPathOptions} options - The options for the function
 * @returns {string} The string reshow of the SVG path
 */
export function stringifySvgPath({ path, topLeft }: IStringifySvgPathOptions): string {
    return (
        '\n' +
        path
            .map(
                ({ command, positions }, index) =>
                    `${command === path[index - 1]?.command ? ` ` : command} ${positions
                        .map((position) => Vector.subtract(position, topLeft))
                        .map((position) => `${position.x.toFixed(1)},${position.y.toFixed(1)}`)
                        .join(' ')}`,
            )
            .join('\n') +
        '\n'
    );
}

/**
 * TODO: Test
 * TODO: Use toFixed
 * TODO: ${firstPoint.x} ${firstPoint.y}`  <- via xyzt method
 */
