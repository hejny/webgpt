import { Vector } from 'xyzt';
import { Color } from '../../color/Color';
import { IImage } from '../IImage';
import { colorDownscaleImage } from './colorDownscaleImage';
import { computeImageAverageColor } from './computeImageAverageColor';
import { computeImageDarkestColor } from './computeImageDarkestColor';
import { computeImageLightestColor } from './computeImageLightestColor';
import { computeImageMinmaxColors } from './computeImageMinmaxColors';
import { computeImageMostFrequentColor } from './computeImageMostFrequentColor';
import { computeImageMostGroupedColor } from './computeImageMostGroupedColor';
import { computeImageMostSaturatedColor } from './computeImageMostSaturatedColor';
import { IImageColorStats, IImageColorStatsRegion } from './IImageColorStats';

/**
 * Compute the image color statistics
 */
export function computeImageColorStats(image: IImage): IImageColorStats {
    const bottomImage = image.crop(new Vector(0, image.height * 0.62), new Vector(image.width, image.height));

    return {
        ...computeWholeImageColorStats(image),
        bottom: computeWholeImageColorStats(bottomImage),
    };
}

/**
 * Compute the image color statistics for whole image
 */
function computeWholeImageColorStats(image: IImage): IImageColorStatsRegion {
    // image = scaleImage(image, 0.1);
    image = colorDownscaleImage(image, 16);

    return {
        averageColor: computeImageAverageColor(image),
        lightestColor: computeImageLightestColor(image),
        darkestColor: computeImageDarkestColor(image),

        minmaxWhite: computeImageMinmaxColors(image, Color.fromHex('#FFFFFF')),
        minmaxRed: computeImageMinmaxColors(image, Color.fromHex('#FF0000')),
        minmaxGreen: computeImageMinmaxColors(image, Color.fromHex('#00FF00')),
        minmaxBlue: computeImageMinmaxColors(image, Color.fromHex('#0000FF')),

        mostFrequentColor: computeImageMostFrequentColor(image),
        mostSaturatedColor: computeImageMostSaturatedColor(image),
        // NOT used - too slow> mostIsolatedColor: computeImageMostIsolatedColor(image),
        mostGroupedColor: computeImageMostGroupedColor(image),
    };
}

/**
 * TODO: Maybe pause inside with some util like forImmediate, forAnimationFrame
 */
