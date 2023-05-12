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
import colorStats from './Pavol_Hejn_a_mountain_range_with_a_clear_blue_sky_dc4c9a47-990e-4c53-a36b-3d1f1eeb3f30-0_0.colors.json';
import metadata from './Pavol_Hejn_a_mountain_range_with_a_clear_blue_sky_dc4c9a47-990e-4c53-a36b-3d1f1eeb3f30-0_0.json';
import source from 'https://cdn.midjourney.com/dc4c9a47-990e-4c53-a36b-3d1f1eeb3f30/0_0.png';
import texts from './Pavol_Hejn_a_mountain_range_with_a_clear_blue_sky_dc4c9a47-990e-4c53-a36b-3d1f1eeb3f30-0_0.texts.json';

/**
 * Image of A mountain range with a clear blue sky
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AMountainRangeWithAClearBlueSkyDc4c9a47990e4c53A36b3d1f1eeb3f300_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A mountain range with a clear blue sky"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AMountainRangeWithAClearBlueSkyDc4c9a47990e4c53A36b3d1f1eeb3f300_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AMountainRangeWithAClearBlueSkyDc4c9a47990e4c53A36b3d1f1eeb3f300_0_Image.colorStats = hydrateColorStats(colorStats);
AMountainRangeWithAClearBlueSkyDc4c9a47990e4c53A36b3d1f1eeb3f300_0_Image.texts = texts satisfies IWallpaperTexts;
