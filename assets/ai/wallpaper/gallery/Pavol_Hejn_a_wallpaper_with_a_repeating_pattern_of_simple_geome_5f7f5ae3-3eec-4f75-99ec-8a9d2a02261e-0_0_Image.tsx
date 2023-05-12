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
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_repeating_pattern_of_simple_geome_5f7f5ae3-3eec-4f75-99ec-8a9d2a02261e-0_0.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_repeating_pattern_of_simple_geome_5f7f5ae3-3eec-4f75-99ec-8a9d2a02261e-0_0.json';
import source from 'https://cdn.midjourney.com/5f7f5ae3-3eec-4f75-99ec-8a9d2a02261e/0_0.png';
import texts from './Pavol_Hejn_a_wallpaper_with_a_repeating_pattern_of_simple_geome_5f7f5ae3-3eec-4f75-99ec-8a9d2a02261e-0_0.texts.json';

/**
 * Image of A wallpaper with a repeating pattern of simple geometric shapes, arranged in a grid-like structure.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithARepeatingPatternOfSimpleGeome5f7f5ae33eec4f7599ec8a9d2a02261e0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a repeating pattern of simple geometric shapes, arranged in a grid-like structure."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithARepeatingPatternOfSimpleGeome5f7f5ae33eec4f7599ec8a9d2a02261e0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithARepeatingPatternOfSimpleGeome5f7f5ae33eec4f7599ec8a9d2a02261e0_0_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithARepeatingPatternOfSimpleGeome5f7f5ae33eec4f7599ec8a9d2a02261e0_0_Image.texts =
    texts satisfies IWallpaperTexts;
