import { Vector } from 'xyzt';
import { AspectRatioRange } from './AspectRatioRange';

/**
 * Test if aspect ratio is in range
 *
 * @param aspectRange as a pattern
 * @param aspect to test
 * @returns true, if the aspect is in range
 */
export function isInAspectRatioRange(aspectRange: AspectRatioRange, aspect: Vector): boolean {
    let minRatio = aspectRange[0].x / aspectRange[0].y;
    let maxRatio = aspectRange[1].x / aspectRange[1].y;
    let checkRatio = aspect.x / aspect.y;

    if (minRatio > maxRatio) {
        [minRatio, maxRatio] = [maxRatio, minRatio];
    }

    return checkRatio >= minRatio && checkRatio <= maxRatio;
}
