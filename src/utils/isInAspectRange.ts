import { Vector } from 'xyzt';

export type AspectRatioRange = [Vector, Vector];

export function isInAspectRatioRange(aspectRange: AspectRatioRange, aspect: Vector): boolean {
    let minRatio = aspectRange[0].x / aspectRange[0].y;
    let maxRatio = aspectRange[1].x / aspectRange[1].y;
    let checkRatio = aspect.x / aspect.y;

    console.log({ minRatio, maxRatio, checkRatio })

    return checkRatio >= minRatio && checkRatio <= maxRatio;
}
