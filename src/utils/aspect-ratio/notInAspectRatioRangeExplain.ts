import spaceTrim from 'spacetrim';
import { Vector } from 'xyzt';
import { AspectRatioRange } from './AspectRatioRange';

function aspectRatioToString(aspect: Vector): string {
    return `${aspect.x}:${aspect.y} (${aspect.x / aspect.y})`;
}

export function notInAspectRatioRangeExplain(aspectRange: AspectRatioRange, aspect: Vector): string {
    return spaceTrim(
        (block) =>
            `
                Aspect ratio ${aspectRatioToString(aspect)} is out of the range:

                From:
                ${aspectRatioToString(aspectRange[0])}

                To:
                ${aspectRatioToString(aspectRange[1])}
            `,
    );
}
