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
import colorStats from './Pavol_Hejn_a_wallpaper_featuring_a_repeating_pattern_of_sleek_a_91150074-94a9-4b45-a508-a7f8776699e7-0_3.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_featuring_a_repeating_pattern_of_sleek_a_91150074-94a9-4b45-a508-a7f8776699e7-0_3.json';
import source from 'https://cdn.midjourney.com/91150074-94a9-4b45-a508-a7f8776699e7/0_3.png';
import texts from './Pavol_Hejn_a_wallpaper_featuring_a_repeating_pattern_of_sleek_a_91150074-94a9-4b45-a508-a7f8776699e7-0_3.texts.json';

/**
 * Image of A wallpaper featuring a repeating pattern of sleek and modern digital devices, such as smartphones, tablets, and laptops, set against a gradient background.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AWallpaperFeaturingARepeatingPatternOfSleekA9115007494a94b45A508A7f8776699e70_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper featuring a repeating pattern of sleek and modern digital devices, such as smartphones, tablets, and laptops, set against a gradient background."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperFeaturingARepeatingPatternOfSleekA9115007494a94b45A508A7f8776699e70_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperFeaturingARepeatingPatternOfSleekA9115007494a94b45A508A7f8776699e70_3_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperFeaturingARepeatingPatternOfSleekA9115007494a94b45A508A7f8776699e70_3_Image.texts =
    texts satisfies IWallpaperTexts;
