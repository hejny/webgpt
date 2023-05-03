import { Image } from '../Image';
import { computeImageAverageColor } from './computeImageAverageColor';
import { computeImageDarkestColor } from './computeImageDarkestColor';
import { computeImageLightestColor } from './computeImageLightestColor';
import { IImageColorStats, IImageColorStatsRegion } from './IImageColorStats';

/**
 * Compute the image color statistics
 */
export function computeImageColorStats(image: Image): IImageColorStats {
    // !!! const bottomImage = image.crop(new Vector(0, image.height * 0.62!!!), new Vector(image.width, image.height));

    return {
        ...computeWholeImageColorStats(image),
        // !!!! bottom: computeWholeImageColorStats(bottomImage),
    } as any /* <- !!! */;
}

/**
 * Compute the image color statistics for whole image
 */
function computeWholeImageColorStats(image: Image): IImageColorStatsRegion {
    return {
        averageColor: computeImageAverageColor(image),
        lightestColor: computeImageLightestColor(image),
        darkestColor: computeImageDarkestColor(image),
        /*  !!!!
        mostFrequentColor: computeImageMostFrequentColor(image),
        leastFrequentColor: computeImageMostFrequentColor(image),
        mostSaturatedColor: computeImageMostSaturatedColor(image),
        mostIsolatedColor: computeImageMostIsolatedColor(image),
        mostGroupedColor: computeImageMostGroupedColor(image),
        */
    } as any /* <- !!! */;
}

/**
 * TODO: Maybe pause inside with some util like forImmediate, forAnimationFrame
 */
