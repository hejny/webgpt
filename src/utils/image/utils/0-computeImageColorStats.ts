import { Vector } from 'xyzt';
import { COLORSTATS_VERSION } from '../../../../config';
import { Color } from '../../color/Color';
import { IImage } from '../IImage';
import { colorDownscaleImage } from './colorDownscaleImage';
import { computeImageAverageColor } from './computeImageAverageColor';
import { computeImageDarkestColor } from './computeImageDarkestColor';
import { computeImageLightestColor } from './computeImageLightestColor';
import { computeImageMinmaxColors } from './computeImageMinmaxColors';
import { computeImageMostFrequentColors } from './computeImageMostFrequentColors';
import { computeImageMostGroupedColors } from './computeImageMostGroupedColors';
import { computeImageMostSatulightedColors } from './computeImageMostSatulightedColors';
import { IImageColorStats, IImageColorStatsRegion } from './IImageColorStats';



/**
 * Compute the image color statistics
 */
export function computeImageColorStats(image: IImage): IImageColorStats {
    return {
        version: COLORSTATS_VERSION,
        ...computeWholeImageColorStats(image),
        bottomHalf: computeWholeImageColorStats(
            image.crop(new Vector(0, image.height * (1 / 2)), new Vector(image.width, image.height)),
        ),
        bottomThird: computeWholeImageColorStats(
            image.crop(new Vector(0, image.height * (2 / 3)), new Vector(image.width, image.height)),
        ),
        bottomLine: computeWholeImageColorStats(
            image.crop(new Vector(0, image.height - 1), new Vector(image.width, image.height)),
        ),
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

        mostFrequentColors: computeImageMostFrequentColors(image),
        mostSatulightedColors: computeImageMostSatulightedColors(image),
        mostGroupedColors: computeImageMostGroupedColors(image),
    };
}

/**
 * TODO: Maybe pause inside with some util like forImmediate, forAnimationFrame
 */
