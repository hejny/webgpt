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
import colorStats from './Pavol_Hejn_a_cozy_image_of_a_fireplace_with_logs_and_flames_for_ab61678f-4b86-43ad-a16d-e487c92237b1-0_2.colors.json';
import metadata from './Pavol_Hejn_a_cozy_image_of_a_fireplace_with_logs_and_flames_for_ab61678f-4b86-43ad-a16d-e487c92237b1-0_2.json';
import source from 'https://cdn.midjourney.com/ab61678f-4b86-43ad-a16d-e487c92237b1/0_2.png';
import texts from './Pavol_Hejn_a_cozy_image_of_a_fireplace_with_logs_and_flames_for_ab61678f-4b86-43ad-a16d-e487c92237b1-0_2.texts.json';

/**
 * Image of A cozy image of a fireplace with logs and flames for a home decor or lifestyle blog.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ACozyImageOfAFireplaceWithLogsAndFlamesForAb61678f4b8643adA16dE487c92237b10_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A cozy image of a fireplace with logs and flames for a home decor or lifestyle blog."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACozyImageOfAFireplaceWithLogsAndFlamesForAb61678f4b8643adA16dE487c92237b10_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ACozyImageOfAFireplaceWithLogsAndFlamesForAb61678f4b8643adA16dE487c92237b10_2_Image.colorStats =
    hydrateColorStats(colorStats);
ACozyImageOfAFireplaceWithLogsAndFlamesForAb61678f4b8643adA16dE487c92237b10_2_Image.texts =
    texts satisfies IWallpaperTexts;
