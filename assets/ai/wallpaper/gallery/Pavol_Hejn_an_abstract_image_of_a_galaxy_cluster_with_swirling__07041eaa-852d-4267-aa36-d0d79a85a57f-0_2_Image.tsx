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
import colorStats from './Pavol_Hejn_an_abstract_image_of_a_galaxy_cluster_with_swirling__07041eaa-852d-4267-aa36-d0d79a85a57f-0_2.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_a_galaxy_cluster_with_swirling__07041eaa-852d-4267-aa36-d0d79a85a57f-0_2.json';
import source from 'https://cdn.midjourney.com/07041eaa-852d-4267-aa36-d0d79a85a57f/0_2.png';
import texts from './Pavol_Hejn_an_abstract_image_of_a_galaxy_cluster_with_swirling__07041eaa-852d-4267-aa36-d0d79a85a57f-0_2.texts.json';

/**
 * Image of An abstract image of a galaxy cluster, with swirling colors and patterns representing the vastness of space.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfAGalaxyClusterWithSwirling07041eaa852d4267Aa36D0d79a85a57f0_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of a galaxy cluster, with swirling colors and patterns representing the vastness of space."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfAGalaxyClusterWithSwirling07041eaa852d4267Aa36D0d79a85a57f0_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfAGalaxyClusterWithSwirling07041eaa852d4267Aa36D0d79a85a57f0_2_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfAGalaxyClusterWithSwirling07041eaa852d4267Aa36D0d79a85a57f0_2_Image.texts =
    texts satisfies IWallpaperTexts;
