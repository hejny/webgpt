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
import colorStats from './Pavol_Hejn_an_image_of_a_rocket_taking_off_from_earth_with_a_fi_47eddbfa-ffaf-4ccd-be18-9242b7336618-0_3.colors.json';
import metadata from './Pavol_Hejn_an_image_of_a_rocket_taking_off_from_earth_with_a_fi_47eddbfa-ffaf-4ccd-be18-9242b7336618-0_3.json';
import source from 'https://cdn.midjourney.com/47eddbfa-ffaf-4ccd-be18-9242b7336618/0_3.png';
import texts from './Pavol_Hejn_an_image_of_a_rocket_taking_off_from_earth_with_a_fi_47eddbfa-ffaf-4ccd-be18-9242b7336618-0_3.texts.json';

/**
 * Image of An image of a rocket taking off from Earth, with a fiery trail leading into the clouds.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AnImageOfARocketTakingOffFromEarthWithAFi47eddbfaFfaf4ccdBe189242b73366180_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An image of a rocket taking off from Earth, with a fiery trail leading into the clouds."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnImageOfARocketTakingOffFromEarthWithAFi47eddbfaFfaf4ccdBe189242b73366180_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnImageOfARocketTakingOffFromEarthWithAFi47eddbfaFfaf4ccdBe189242b73366180_3_Image.colorStats =
    hydrateColorStats(colorStats);
AnImageOfARocketTakingOffFromEarthWithAFi47eddbfaFfaf4ccdBe189242b73366180_3_Image.texts =
    texts satisfies IWallpaperTexts;
