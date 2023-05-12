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
import colorStats from './Pavol_Hejn_an_abstract_image_of_a_galaxy_cluster_with_swirling__d1a733fe-016a-4ed7-8e13-0edad6a2d938-0_1.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_a_galaxy_cluster_with_swirling__d1a733fe-016a-4ed7-8e13-0edad6a2d938-0_1.json';
import source from 'https://cdn.midjourney.com/d1a733fe-016a-4ed7-8e13-0edad6a2d938/0_1.png';
import texts from './Pavol_Hejn_an_abstract_image_of_a_galaxy_cluster_with_swirling__d1a733fe-016a-4ed7-8e13-0edad6a2d938-0_1.texts.json';

/**
 * Image of An abstract image of a galaxy cluster, with swirling colors and patterns representing the vastness of space.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfAGalaxyClusterWithSwirlingD1a733fe016a4ed78e130edad6a2d9380_1_Image(
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

AnAbstractImageOfAGalaxyClusterWithSwirlingD1a733fe016a4ed78e130edad6a2d9380_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfAGalaxyClusterWithSwirlingD1a733fe016a4ed78e130edad6a2d9380_1_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfAGalaxyClusterWithSwirlingD1a733fe016a4ed78e130edad6a2d9380_1_Image.texts =
    texts satisfies IWallpaperTexts;
