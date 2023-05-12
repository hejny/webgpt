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
import colorStats from './Pavol_Hejn_a_close_up_of_a_spiderweb_with_dew_drops_33e477af-06e3-44a4-8973-605a78f79f37-0_3.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_a_spiderweb_with_dew_drops_33e477af-06e3-44a4-8973-605a78f79f37-0_3.json';
import source from 'https://cdn.midjourney.com/33e477af-06e3-44a4-8973-605a78f79f37/0_3.png';
import texts from './Pavol_Hejn_a_close_up_of_a_spiderweb_with_dew_drops_33e477af-06e3-44a4-8973-605a78f79f37-0_3.texts.json';

/**
 * Image of A close-up of a spiderweb with dew drops
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfASpiderwebWithDewDrops3e477af06e344a48973605a78f79f3703_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up of a spiderweb with dew drops"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpOfASpiderwebWithDewDrops3e477af06e344a48973605a78f79f3703_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ACloseUpOfASpiderwebWithDewDrops3e477af06e344a48973605a78f79f3703_3_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfASpiderwebWithDewDrops3e477af06e344a48973605a78f79f3703_3_Image.texts = texts satisfies IWallpaperTexts;
