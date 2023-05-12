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
import colorStats from './Pavol_Hejn_an_abstract_image_of_a_stormy_sky_with_lightning_bol_87fa4240-efe7-43e4-aa6d-4b34092770dc-0_3.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_a_stormy_sky_with_lightning_bol_87fa4240-efe7-43e4-aa6d-4b34092770dc-0_3.json';
import texts from './Pavol_Hejn_an_abstract_image_of_a_stormy_sky_with_lightning_bol_87fa4240-efe7-43e4-aa6d-4b34092770dc-0_3.texts.json';

/**
 * Image of An abstract image of a stormy sky with lightning bolts for a weather or news website
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfAStormySkyWithLightningBol87fa4240Efe743e4Aa6d4b34092770dc0_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of a stormy sky with lightning bolts for a weather or news website"
            src="https://cdn.midjourney.com/87fa4240-efe7-43e4-aa6d-4b34092770dc/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfAStormySkyWithLightningBol87fa4240Efe743e4Aa6d4b34092770dc0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfAStormySkyWithLightningBol87fa4240Efe743e4Aa6d4b34092770dc0_3_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfAStormySkyWithLightningBol87fa4240Efe743e4Aa6d4b34092770dc0_3_Image.texts =
    texts satisfies IWallpaperTexts;
