import { IVector, Vector } from 'xyzt';
import { take } from '../../../take/take';
import { IImage } from '../../IImage';
import { colorDownscaleImage } from '../../utils/colorDownscaleImage';
import { computeImageAverageColor } from '../../utils/computeImageAverageColor';
import { computeImageDarkestColor } from '../../utils/computeImageDarkestColor';
import { computeImageLightestColor } from '../../utils/computeImageLightestColor';
import { computeImageMostFrequentColors } from '../../utils/computeImageMostFrequentColors';
import { computeImageMostGroupedColors } from '../../utils/computeImageMostGroupedColors';
import { computeImageMostSatulightedColors } from '../../utils/computeImageMostSatulightedColors';
import { forARest } from '../../utils/forARest';
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

    const computeWholeImageColorStats = async (image: IImage): Promise<IImageColorStatsRegion> => {
        image = scaleImage(image, size);
        image = colorDownscaleImage(image, colorBits);

        await forARest();

        return {
            // Note: There is a strange type problem when averageColor, lightestColor and darkestColor is not wrapped in take()
            averageColor: take(await computeImageAverageColor(image)),
            lightestColor: take(await computeImageLightestColor(image)),
            darkestColor: take(await computeImageDarkestColor(image)),
            mostFrequentColors: await computeImageMostFrequentColors(image),
            mostSatulightedColors: await computeImageMostSatulightedColors(image),
            mostGroupedColors: await computeImageMostGroupedColors(image),
        };
    };

    const computeImageColorStats = async (image: IImage): Promise<IImageColorStatsAdvanced<string>> => {
        const stats = {
            ...(await computeWholeImageColorStats(image)),
            bottomHalf: await computeWholeImageColorStats(
                image.crop(new Vector(0, image.height * (1 / 2)), new Vector(image.width, image.height)),
            ),
            bottomThird: await computeWholeImageColorStats(
                image.crop(new Vector(0, image.height * (2 / 3)), new Vector(image.width, image.height)),
            ),
            bottomLine: await computeWholeImageColorStats(
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
