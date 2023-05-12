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
import colorStats from './Pavol_Hejn_a_wallpaper_featuring_a_repeating_pattern_of_sleek_a_2b4b375d-f802-44d0-bde1-40f0b746b291-0_2.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_featuring_a_repeating_pattern_of_sleek_a_2b4b375d-f802-44d0-bde1-40f0b746b291-0_2.json';
import source from 'https://cdn.midjourney.com/2b4b375d-f802-44d0-bde1-40f0b746b291/0_2.png';
import texts from './Pavol_Hejn_a_wallpaper_featuring_a_repeating_pattern_of_sleek_a_2b4b375d-f802-44d0-bde1-40f0b746b291-0_2.texts.json';

/**
 * Image of A wallpaper featuring a repeating pattern of sleek and modern digital devices, such as smartphones, tablets, and laptops.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AWallpaperFeaturingARepeatingPatternOfSleekAb4b375dF80244d0Bde140f0b746b29102_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper featuring a repeating pattern of sleek and modern digital devices, such as smartphones, tablets, and laptops."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperFeaturingARepeatingPatternOfSleekAb4b375dF80244d0Bde140f0b746b29102_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperFeaturingARepeatingPatternOfSleekAb4b375dF80244d0Bde140f0b746b29102_2_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperFeaturingARepeatingPatternOfSleekAb4b375dF80244d0Bde140f0b746b29102_2_Image.texts =
    texts satisfies IWallpaperTexts;
