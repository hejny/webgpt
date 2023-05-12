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
import colorStats from './Pavol_Hejn_a_minimalist_image_of_a_city_skyline_at_night_for_a__78c37b7e-cca8-4fba-8a18-0ea06cce6465-0_1.colors.json';
import metadata from './Pavol_Hejn_a_minimalist_image_of_a_city_skyline_at_night_for_a__78c37b7e-cca8-4fba-8a18-0ea06cce6465-0_1.json';
import source from 'https://cdn.midjourney.com/78c37b7e-cca8-4fba-8a18-0ea06cce6465/0_1.png';
import texts from './Pavol_Hejn_a_minimalist_image_of_a_city_skyline_at_night_for_a__78c37b7e-cca8-4fba-8a18-0ea06cce6465-0_1.texts.json';

/**
 * Image of A minimalist image of a city skyline at night for a real estate or architecture website
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AMinimalistImageOfACitySkylineAtNightForA78c37b7eCca84fba8a180ea06cce64650_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A minimalist image of a city skyline at night for a real estate or architecture website"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AMinimalistImageOfACitySkylineAtNightForA78c37b7eCca84fba8a180ea06cce64650_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AMinimalistImageOfACitySkylineAtNightForA78c37b7eCca84fba8a180ea06cce64650_1_Image.colorStats =
    hydrateColorStats(colorStats);
AMinimalistImageOfACitySkylineAtNightForA78c37b7eCca84fba8a180ea06cce64650_1_Image.texts =
    texts satisfies IWallpaperTexts;
