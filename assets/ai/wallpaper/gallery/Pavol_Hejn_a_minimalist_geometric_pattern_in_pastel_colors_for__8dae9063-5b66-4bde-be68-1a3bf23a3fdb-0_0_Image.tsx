/**
 * 🏭 GENERATED WITH 🖼️ Generate wallpapers library
 * ⚠️ Warning: Do not edit by hand, all changes will be lost on next execution!
 *    If you want to edit this file:
 *      - Change @generated to @not-generated
 *      - And remove this warning
 *    Then the file will not be re-generated automatically
 */
import Image from 'next/image';
import { Color } from '../../../../src/utils/color/Color';
import { colorToDataUrl } from '../../../../src/utils/color/utils/colorToDataUrl';
import { hydrateColorStats } from '../../../../src/utils/image/utils/hydrateColorStats';
import { IWallpaperComponentProps, IWallpaperMetadata, IWallpaperTexts } from '../IWallpaperComponent';
import colorStats from './Pavol_Hejn_a_minimalist_geometric_pattern_in_pastel_colors_for__8dae9063-5b66-4bde-be68-1a3bf23a3fdb-0_0.colors.json';
import metadata from './Pavol_Hejn_a_minimalist_geometric_pattern_in_pastel_colors_for__8dae9063-5b66-4bde-be68-1a3bf23a3fdb-0_0.json';
import texts from './Pavol_Hejn_a_minimalist_geometric_pattern_in_pastel_colors_for__8dae9063-5b66-4bde-be68-1a3bf23a3fdb-0_0.texts.json';

/**
 * Image of A minimalist geometric pattern in pastel colors for a fashion or beauty website
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AMinimalistGeometricPatternInPastelColorsFor8dae90635b664bdeBe681a3bf23a3fdb0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A minimalist geometric pattern in pastel colors for a fashion or beauty website"
            src="https://cdn.midjourney.com/8dae9063-5b66-4bde-be68-1a3bf23a3fdb/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AMinimalistGeometricPatternInPastelColorsFor8dae90635b664bdeBe681a3bf23a3fdb0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AMinimalistGeometricPatternInPastelColorsFor8dae90635b664bdeBe681a3bf23a3fdb0_0_Image.colorStats =
    hydrateColorStats(colorStats);
AMinimalistGeometricPatternInPastelColorsFor8dae90635b664bdeBe681a3bf23a3fdb0_0_Image.texts =
    texts satisfies IWallpaperTexts;
