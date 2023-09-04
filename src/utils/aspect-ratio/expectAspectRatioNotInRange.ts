import spaceTrim from 'spacetrim';
import { Vector } from 'xyzt';
import { AspectRatioRange } from './AspectRatioRange';
import { aspectRatioRangeExplain } from './aspectRatioRangeExplain';
import { isInAspectRatioRange } from './isInAspectRatioRange';

export function expectAspectRatioNotInRange(message: string, aspectRange: AspectRatioRange, aspect: Vector): void {
    if (isInAspectRatioRange(aspectRange, aspect)) {
        throw new Error(
            spaceTrim(
                (block) => `

                    Aspect ratio is in range BUT it should not be ${block(message)}
                
                    ${block(aspectRatioRangeExplain(aspectRange, aspect))}
                    
                `,
            ),
        );
    }
}
