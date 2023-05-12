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
import colorStats from './Pavol_Hejn_a_panoramic_image_of_a_mountain_range_with_mist_and__d8329db9-b671-4eb7-a129-37e96d8851b5-0_2.colors.json';
import metadata from './Pavol_Hejn_a_panoramic_image_of_a_mountain_range_with_mist_and__d8329db9-b671-4eb7-a129-37e96d8851b5-0_2.json';
import source from 'https://cdn.midjourney.com/d8329db9-b671-4eb7-a129-37e96d8851b5/0_2.png';
import texts from './Pavol_Hejn_a_panoramic_image_of_a_mountain_range_with_mist_and__d8329db9-b671-4eb7-a129-37e96d8851b5-0_2.texts.json';

/**
 * Image of A panoramic image of a mountain range, with mist and clouds drifting through the peaks.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function APanoramicImageOfAMountainRangeWithMistAndD8329db9B6714eb7A12937e96d8851b50_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A panoramic image of a mountain range, with mist and clouds drifting through the peaks."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

APanoramicImageOfAMountainRangeWithMistAndD8329db9B6714eb7A12937e96d8851b50_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
APanoramicImageOfAMountainRangeWithMistAndD8329db9B6714eb7A12937e96d8851b50_2_Image.colorStats =
    hydrateColorStats(colorStats);
APanoramicImageOfAMountainRangeWithMistAndD8329db9B6714eb7A12937e96d8851b50_2_Image.texts =
    texts satisfies IWallpaperTexts;
