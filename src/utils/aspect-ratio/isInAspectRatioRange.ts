import { Vector } from 'xyzt';
import { AspectRatioRange } from './AspectRatioRange';

export function isInAspectRatioRange(aspectRange: AspectRatioRange, aspect: Vector): boolean {
    let minRatio = aspectRange[0].x / aspectRange[0].y;
    let maxRatio = aspectRange[1].x / aspectRange[1].y;
    let checkRatio = aspect.x / aspect.y;

    if (minRatio > maxRatio) {
        [minRatio, maxRatio] = [maxRatio, minRatio];
    }

    console.log({ minRatio, maxRatio, checkRatio });

    return checkRatio >= minRatio && checkRatio <= maxRatio;
}
