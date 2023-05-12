/**
 * 🏭 GENERATED WITH 🖼️ Generate wallpapers library
 * ⚠️ Warning: Do not edit by hand, all changes will be lost on next execution!
 *    If you want to edit this file:
 *      - Change @generated to @not-generated
 *      - And remove this warning
 *    Then the file will not be re-generated automatically
 */

import Image from 'next/image';
import { hydrateColorStats } from '../../../../src/utils/image/utils/hydrateColorStats';
import { IWallpaperMetadata, IWallpaperTexts, IWallpaperComponentProps } from '../IWallpaperComponent';
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_repeating_pattern_of_circuit_boar_d0435256-b950-43d1-aeae-06b2fe4fc02a-0_0.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_repeating_pattern_of_circuit_boar_d0435256-b950-43d1-aeae-06b2fe4fc02a-0_0.json';
import source from 'https://cdn.midjourney.com/d0435256-b950-43d1-aeae-06b2fe4fc02a/0_0.png';
import texts from './Pavol_Hejn_a_wallpaper_with_a_repeating_pattern_of_circuit_boar_d0435256-b950-43d1-aeae-06b2fe4fc02a-0_0.texts.json';

/**
 * Image of A wallpaper with a repeating pattern of circuit board components, in shades of black, grey, and neon green.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithARepeatingPatternOfCircuitBoarD0435256B95043d1Aeae06b2fe4fc02a0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a repeating pattern of circuit board components, in shades of black, grey, and neon green."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithARepeatingPatternOfCircuitBoarD0435256B95043d1Aeae06b2fe4fc02a0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithARepeatingPatternOfCircuitBoarD0435256B95043d1Aeae06b2fe4fc02a0_0_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithARepeatingPatternOfCircuitBoarD0435256B95043d1Aeae06b2fe4fc02a0_0_Image.texts =
    texts satisfies IWallpaperTexts;
