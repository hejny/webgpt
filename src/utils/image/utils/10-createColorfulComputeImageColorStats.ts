import { IVector, Vector } from 'xyzt';
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
    size: IVector;
}): IComputeImageColorStats<string /* TODO: `colorful-${TColorBits}bit-${...}-1`*/> {
    const { colorBits } = options;

    // Check that size has positive integer values
    const size = Vector.fromObject(options.size);
    if (size.x < 1 || size.y < 1 || size.x % 1 !== 0 || size.y % 1 !== 0) {
        throw new Error(`Size must have positive integer values, got ${size.x}x${size.y}`);
    }

    const version = `colorful-${size.x}x${size.y}-${options.colorBits}bit-v11` as string;

    const computeWholeImageColorStats = (image: IImage): IImageColorStatsRegion => {
        image = scaleImage(image, size);
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
