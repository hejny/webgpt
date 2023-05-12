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
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_repeating_pattern_of_abstract_sha_e08f172d-feaa-4685-befd-08422bb31952-0_1.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_repeating_pattern_of_abstract_sha_e08f172d-feaa-4685-befd-08422bb31952-0_1.json';
import source from 'https://cdn.midjourney.com/e08f172d-feaa-4685-befd-08422bb31952/0_1.png';
import texts from './Pavol_Hejn_a_wallpaper_with_a_repeating_pattern_of_abstract_sha_e08f172d-feaa-4685-befd-08422bb31952-0_1.texts.json';

/**
 * Image of A wallpaper with a repeating pattern of abstract shapes and colors, inspired by web design trends and patterns.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithARepeatingPatternOfAbstractShaE08f172dFeaa4685Befd08422bb319520_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a repeating pattern of abstract shapes and colors, inspired by web design trends and patterns."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithARepeatingPatternOfAbstractShaE08f172dFeaa4685Befd08422bb319520_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithARepeatingPatternOfAbstractShaE08f172dFeaa4685Befd08422bb319520_1_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithARepeatingPatternOfAbstractShaE08f172dFeaa4685Befd08422bb319520_1_Image.texts =
    texts satisfies IWallpaperTexts;
