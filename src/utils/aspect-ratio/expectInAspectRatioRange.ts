import spaceTrim from 'spacetrim';
import { Vector } from 'xyzt';
import { AspectRatioRange } from './AspectRatioRange';
import { isInAspectRatioRange } from './isInAspectRatioRange';
import { notInAspectRatioRangeExplain } from './notInAspectRatioRangeExplain';

export function expectInAspectRatioRange(message: string, aspectRange: AspectRatioRange, aspect: Vector): void {
    if (!isInAspectRatioRange(aspectRange, aspect)) {
        throw new Error(
            spaceTrim(
                (block) => `

                    ${block(message)}
                
                    ${block(notInAspectRatioRangeExplain(aspectRange, aspect))}
                    
                `,
            ),
        );
    }
}
