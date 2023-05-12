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
import colorStats from './Pavol_Hejn_a_dark_and_moody_image_of_a_misty_graveyard_for_a_ho_78a061bf-3730-4e16-8def-5ce9a2a778ab-0_0.colors.json';
import metadata from './Pavol_Hejn_a_dark_and_moody_image_of_a_misty_graveyard_for_a_ho_78a061bf-3730-4e16-8def-5ce9a2a778ab-0_0.json';
import source from 'https://cdn.midjourney.com/78a061bf-3730-4e16-8def-5ce9a2a778ab/0_0.png';
import texts from './Pavol_Hejn_a_dark_and_moody_image_of_a_misty_graveyard_for_a_ho_78a061bf-3730-4e16-8def-5ce9a2a778ab-0_0.texts.json';

/**
 * Image of A dark and moody image of a misty graveyard for a horror or supernatural website
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ADarkAndMoodyImageOfAMistyGraveyardForAHo78a061bf37304e168def5ce9a2a778ab0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A dark and moody image of a misty graveyard for a horror or supernatural website"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ADarkAndMoodyImageOfAMistyGraveyardForAHo78a061bf37304e168def5ce9a2a778ab0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ADarkAndMoodyImageOfAMistyGraveyardForAHo78a061bf37304e168def5ce9a2a778ab0_0_Image.colorStats =
    hydrateColorStats(colorStats);
ADarkAndMoodyImageOfAMistyGraveyardForAHo78a061bf37304e168def5ce9a2a778ab0_0_Image.texts =
    texts satisfies IWallpaperTexts;
