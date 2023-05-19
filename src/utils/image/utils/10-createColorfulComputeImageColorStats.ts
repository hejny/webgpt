import { Vector } from 'xyzt';
import { IImage } from '../IImage';
import { colorDownscaleImage } from './colorDownscaleImage';
import { computeImageAverageColor } from './computeImageAverageColor';
import { computeImageDarkestColor } from './computeImageDarkestColor';
import { computeImageLightestColor } from './computeImageLightestColor';
import { computeImageMostFrequentColors } from './computeImageMostFrequentColors';
import { computeImageMostGroupedColors } from './computeImageMostGroupedColors';
import { computeImageMostSatulightedColors } from './computeImageMostSatulightedColors';
import { computeImagePalette } from './computeImagePalette';
import { IComputeImageColorStats, IImageColorStatsAdvanced, IImageColorStatsRegion } from './IImageColorStats';
import { scaleImage } from './scaleImage';

/**
 * @@@
 */
export function createColorfulComputeImageColorStats /* TODO: <TColorBits extends number, TScale extends number>*/(options: {
    colorBits: number;
    scale: number;
}): IComputeImageColorStats<string /* TODO: `colorful-${TColorBits}bit-${...}-1`*/> {
    const { scale, colorBits } = options;
    const version = `colorful-${options.colorBits}bit-${options.scale === 1 ? 'fullsize' : options.scale}-1` as string;

    const computeWholeImageColorStats = (image: IImage): IImageColorStatsRegion => {
        image = scaleImage(image, scale);
        image = colorDownscaleImage(image, colorBits);

        return {
            averageColor: computeImageAverageColor(image),
            lightestColor: computeImageLightestColor(image),
            darkestColor: computeImageDarkestColor(image),
            mostFrequentColors: computeImageMostFrequentColors(image),
            mostSatulightedColors: computeImageMostSatulightedColors(image),
            mostGroupedColors: computeImageMostGroupedColors(image),
        };
    };

    const computeImageColorStats = (image: IImage): IImageColorStatsAdvanced<string> => {
        const stats = {
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
        } satisfies Omit<IImageColorStatsAdvanced<string>, 'version' | 'palette'>;

        return { version, palette: computeImagePalette(stats), ...stats };
    };

    computeImageColorStats.version = version;

    return computeImageColorStats;
}

/**
 * TODO: Maybe pause inside with some util like forImmediate, forAnimationFrame
 */
