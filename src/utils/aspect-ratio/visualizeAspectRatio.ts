import { spaceTrim } from 'spacetrim';
import { Vector } from 'xyzt';

/**
 * Visualize aspect ratio
 *
 * @param aspectRatio to visualize
 * @returns visual representation of aspect ratio
 */
export function visualizeAspectRatio(aspectRatio: Vector): string {
    const fraction = `${aspectRatio.x}:${aspectRatio.y}`;
    // TODO: baseFraction
    const division = (Math.round((aspectRatio.x / aspectRatio.y) * 100) / 100).toFixed(2);

    let visualBlocks = '';

    if (aspectRatio.x > aspectRatio.y) {
        visualBlocks = '🟦'.repeat(Math.ceil(aspectRatio.x / aspectRatio.y));
    } else {
        visualBlocks = '🟦\n'.repeat(Math.ceil(aspectRatio.y / aspectRatio.x));
    }

    return spaceTrim(
        (block) => `
            ${fraction} (${division})
            ${block(visualBlocks)} 
        `,
    );
}

/**
 * TODO: Try to make non-discrete 🟦
 */
