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
import colorStats from './Pavol_Hejn_a_group_of_ainauts_standing_on_the_surface_of_a_mass_bc972e45-e785-4ed8-a36b-1031308c4ae4-0_3.colors.json';
import metadata from './Pavol_Hejn_a_group_of_ainauts_standing_on_the_surface_of_a_mass_bc972e45-e785-4ed8-a36b-1031308c4ae4-0_3.json';
import source from 'https://cdn.midjourney.com/bc972e45-e785-4ed8-a36b-1031308c4ae4/0_3.png';
import texts from './Pavol_Hejn_a_group_of_ainauts_standing_on_the_surface_of_a_mass_bc972e45-e785-4ed8-a36b-1031308c4ae4-0_3.texts.json';

/**
 * Image of A group of AInauts standing on the surface of a massive, rocky planet, with towering mountains and deep canyons all around them.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AGroupOfAinautsStandingOnTheSurfaceOfAMassBc972e45E7854ed8A36b1031308c4ae40_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A group of AInauts standing on the surface of a massive, rocky planet, with towering mountains and deep canyons all around them."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AGroupOfAinautsStandingOnTheSurfaceOfAMassBc972e45E7854ed8A36b1031308c4ae40_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AGroupOfAinautsStandingOnTheSurfaceOfAMassBc972e45E7854ed8A36b1031308c4ae40_3_Image.colorStats =
    hydrateColorStats(colorStats);
AGroupOfAinautsStandingOnTheSurfaceOfAMassBc972e45E7854ed8A36b1031308c4ae40_3_Image.texts =
    texts satisfies IWallpaperTexts;
