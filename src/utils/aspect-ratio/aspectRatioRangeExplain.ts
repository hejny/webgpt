import spaceTrim from 'spacetrim';
import { Vector } from 'xyzt';
import { AspectRatioRange } from './AspectRatioRange';

function aspectRatioToString(aspect: Vector): string {
    const fraction = `${aspect.x}:${aspect.y}`;
    // TODO: baseFraction
    const division = (Math.round((aspect.x / aspect.y) * 100) / 100).toFixed(2);

    let visualBlocks = '';

    if (aspect.x > aspect.y) {
        visualBlocks = '🟦'.repeat(Math.ceil(aspect.x / aspect.y));
    } else {
        visualBlocks = '🟦\n'.repeat(Math.ceil(aspect.y / aspect.x));
    }

    return spaceTrim(
        (block) => `
            ${fraction} (${division})
            ${block(visualBlocks)} 
        `,
    );
}

export function aspectRatioRangeExplain(aspectRange: AspectRatioRange, aspect: Vector): string {
    return spaceTrim(
        (block) =>
            `
                Image aspect ratio:
                ${block(aspectRatioToString(aspect))}

                ↦ Max horizontal aspect ratio:
                ${block(aspectRatioToString(aspectRange[0]))}

                ↥ Max vertical aspect ratio:
                ${block(aspectRatioToString(aspectRange[1]))}
            `,
    );
}

/**
 * TODO: Show only the problematic bound ↦ OR ↥ NOT both + maybe visually highlight problematic part by 🟥 instead of 🟦
 * TODO: Try to make non-discrete 🟦
 */
