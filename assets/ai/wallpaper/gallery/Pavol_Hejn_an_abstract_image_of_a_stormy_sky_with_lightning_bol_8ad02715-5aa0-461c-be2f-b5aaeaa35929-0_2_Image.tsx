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
import colorStats from './Pavol_Hejn_an_abstract_image_of_a_stormy_sky_with_lightning_bol_8ad02715-5aa0-461c-be2f-b5aaeaa35929-0_2.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_a_stormy_sky_with_lightning_bol_8ad02715-5aa0-461c-be2f-b5aaeaa35929-0_2.json';
import source from 'https://cdn.midjourney.com/8ad02715-5aa0-461c-be2f-b5aaeaa35929/0_2.png';
import texts from './Pavol_Hejn_an_abstract_image_of_a_stormy_sky_with_lightning_bol_8ad02715-5aa0-461c-be2f-b5aaeaa35929-0_2.texts.json';

/**
 * Image of An abstract image of a stormy sky with lightning bolts for a weather or news website
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfAStormySkyWithLightningBol8ad027155aa0461cBe2fB5aaeaa359290_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of a stormy sky with lightning bolts for a weather or news website"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfAStormySkyWithLightningBol8ad027155aa0461cBe2fB5aaeaa359290_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfAStormySkyWithLightningBol8ad027155aa0461cBe2fB5aaeaa359290_2_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfAStormySkyWithLightningBol8ad027155aa0461cBe2fB5aaeaa359290_2_Image.texts =
    texts satisfies IWallpaperTexts;
