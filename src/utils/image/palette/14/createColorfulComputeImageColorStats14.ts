import { IVector, Vector } from 'xyzt';
import { IImage } from '../../IImage';
import { colorDownscaleImage } from '../../utils/colorDownscaleImage';
import { computeImageAverageColor } from '../../utils/computeImageAverageColor';
import { computeImageDarkestColor } from '../../utils/computeImageDarkestColor';
import { computeImageLightestColor } from '../../utils/computeImageLightestColor';
import { computeImageMostFrequentColors } from '../../utils/computeImageMostFrequentColors';
import { computeImageMostGroupedColors } from '../../utils/computeImageMostGroupedColors';
import { computeImageMostSatulightedColors } from '../../utils/computeImageMostSatulightedColors';
import {
    IComputeImageColorStats,
    IImageColorStatsAdvanced,
    IImageColorStatsRegion,
} from '../../utils/IImageColorStats';
import { scaleImage } from '../../utils/scaleImage';
import { computeImagePalette14 } from './computeImagePalette14';

/**
 * @@@
 */
export function createColorfulComputeImageColorStats14 /* TODO: <TColorBits extends number, TScale extends number>*/(options: {
    colorBits: number;
    size: IVector;
}): IComputeImageColorStats<string /* TODO: `colorful-${TColorBits}bit-${...}-1`*/> {
    const { colorBits } = options;

    // Check that size has positive integer values
    const size = Vector.fromObject(options.size);
    if (size.x < 1 || size.y < 1 || size.x % 1 !== 0 || size.y % 1 !== 0) {
        throw new Error(`Size must have positive integer values, got ${size.x}x${size.y}`);
    }

    const version = `colorful-${size.x}x${size.y}-${options.colorBits}bit-v14palette` as string;

    const computeWholeImageColorStats = (image: IImage): IImageColorStatsRegion => {
        image = scaleImage(image, size);
        image = colorDownscaleImage(image, colorBits);

        return {
            // !!!! Make each subfunction async + this wrapper function async too
            averageColor: computeImageAverageColor(image),
            lightestColor: computeImageLightestColor(image),
            darkestColor: computeImageDarkestColor(image),
            mostFrequentColors: computeImageMostFrequentColors(image),
            mostSatulightedColors: computeImageMostSatulightedColors(image),
            mostGroupedColors: computeImageMostGroupedColors(image),
        };
    };

    const computeImageColorStats = async (image: IImage): Promise<IImageColorStatsAdvanced<string>> => {
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
        } satisfies Omit<IImageColorStatsAdvanced<string>, 'version' | 'palette' | 'paletteCandidates'>;

        const { palette, paletteCandidates } = await computeImagePalette14(stats);
        return { version, palette, paletteCandidates, ...stats };
    };

    computeImageColorStats.version = version;

    return computeImageColorStats;
}

/**
 * @see https://youtu.be/gMqZR3pqMjg
 * TODO: Maybe pause inside with some util like forImmediate, forAnimationFrame
 */
