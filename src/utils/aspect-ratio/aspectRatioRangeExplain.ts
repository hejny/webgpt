import spaceTrim from 'spacetrim';
import { Vector } from 'xyzt';
import { AspectRatioRange } from './AspectRatioRange';
import { visualizeAspectRatio } from './visualizeAspectRatio';

/**
 * Explain how and if the aspect ratio is fitting in the range
 *
 * @param aspectRange as a pattern
 * @param aspect to test
 * @returns explanation if and how the aspect is/is not fitting in the range
 */
export function aspectRatioRangeExplain(aspectRange: AspectRatioRange, aspect: Vector): string {
    return spaceTrim(
        (block) =>
            `
                Image aspect ratio:
                ${block(visualizeAspectRatio(aspect))}

                ↦ Max horizontal aspect ratio:
                ${block(visualizeAspectRatio(aspectRange[0]))}

                ↥ Max vertical aspect ratio:
                ${block(visualizeAspectRatio(aspectRange[1]))}
            `,
    );
}

/**
 * TODO: Show only the problematic bound ↦ OR ↥ NOT both + maybe visually highlight problematic part by 🟥 instead of 🟦
 */
