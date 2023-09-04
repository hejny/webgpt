import spaceTrim from 'spacetrim';
import { Vector } from 'xyzt';
import { AspectRatioRange } from './AspectRatioRange';
import { aspectRatioRangeExplain } from './aspectRatioRangeExplain';
import { isInAspectRatioRange } from './isInAspectRatioRange';

/**
 * Expect aspect ratio to be in range
 * If not, throw an error
 *
 * @param message to show if the aspect ratio is not in range alongside other info
 * @param aspectRange as a pattern
 * @param aspect to test
 */
export function expectAspectRatioInRange(message: string, aspectRange: AspectRatioRange, aspect: Vector): void {
    if (!isInAspectRatioRange(aspectRange, aspect)) {
        throw new Error(
            spaceTrim(
                (block) => `

                    Aspect ratio is NOT in range ${block(message)}
                
                    ${block(aspectRatioRangeExplain(aspectRange, aspect))}
                    
                `,
            ),
        );
    }
}
