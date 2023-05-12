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
import colorStats from './Pavol_Hejn_an_abstract_image_of_a_stormy_sky_with_lightning_bol_42a4535f-1f50-467e-b63e-74a50c027181-0_2.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_a_stormy_sky_with_lightning_bol_42a4535f-1f50-467e-b63e-74a50c027181-0_2.json';
import texts from './Pavol_Hejn_an_abstract_image_of_a_stormy_sky_with_lightning_bol_42a4535f-1f50-467e-b63e-74a50c027181-0_2.texts.json';

/**
 * Image of An abstract image of a stormy sky with lightning bolts for a weather or news website
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfAStormySkyWithLightningBol42a4535f1f50467eB63e74a50c0271810_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of a stormy sky with lightning bolts for a weather or news website"
            src="https://cdn.midjourney.com/42a4535f-1f50-467e-b63e-74a50c027181/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfAStormySkyWithLightningBol42a4535f1f50467eB63e74a50c0271810_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfAStormySkyWithLightningBol42a4535f1f50467eB63e74a50c0271810_2_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfAStormySkyWithLightningBol42a4535f1f50467eB63e74a50c0271810_2_Image.texts =
    texts satisfies IWallpaperTexts;
