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
import colorStats from './Pavol_Hejn_a_digital_image_of_a_galaxy_collision_with_swirling__28302389-cdf2-4ca7-86b1-b376e8076eed-0_1.colors.json';
import metadata from './Pavol_Hejn_a_digital_image_of_a_galaxy_collision_with_swirling__28302389-cdf2-4ca7-86b1-b376e8076eed-0_1.json';
import source from 'https://cdn.midjourney.com/28302389-cdf2-4ca7-86b1-b376e8076eed/0_1.png';
import texts from './Pavol_Hejn_a_digital_image_of_a_galaxy_collision_with_swirling__28302389-cdf2-4ca7-86b1-b376e8076eed-0_1.texts.json';

/**
 * Image of A digital image of a galaxy collision, with swirling colors and distorted shapes representing the chaos of the event.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ADigitalImageOfAGalaxyCollisionWithSwirling28302389Cdf24ca786b1B376e8076eed0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A digital image of a galaxy collision, with swirling colors and distorted shapes representing the chaos of the event."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ADigitalImageOfAGalaxyCollisionWithSwirling28302389Cdf24ca786b1B376e8076eed0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ADigitalImageOfAGalaxyCollisionWithSwirling28302389Cdf24ca786b1B376e8076eed0_1_Image.colorStats =
    hydrateColorStats(colorStats);
ADigitalImageOfAGalaxyCollisionWithSwirling28302389Cdf24ca786b1B376e8076eed0_1_Image.texts =
    texts satisfies IWallpaperTexts;
