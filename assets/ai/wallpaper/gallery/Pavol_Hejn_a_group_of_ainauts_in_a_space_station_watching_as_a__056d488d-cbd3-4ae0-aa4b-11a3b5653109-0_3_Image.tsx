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
import colorStats from './Pavol_Hejn_a_group_of_ainauts_in_a_space_station_watching_as_a__056d488d-cbd3-4ae0-aa4b-11a3b5653109-0_3.colors.json';
import metadata from './Pavol_Hejn_a_group_of_ainauts_in_a_space_station_watching_as_a__056d488d-cbd3-4ae0-aa4b-11a3b5653109-0_3.json';
import source from 'https://cdn.midjourney.com/056d488d-cbd3-4ae0-aa4b-11a3b5653109/0_3.png';
import texts from './Pavol_Hejn_a_group_of_ainauts_in_a_space_station_watching_as_a__056d488d-cbd3-4ae0-aa4b-11a3b5653109-0_3.texts.json';

/**
 * Image of A group of AInauts in a space station watching as a massive asteroid hurtles towards Earth, with only their AI and technology to save them.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AGroupOfAinautsInASpaceStationWatchingAsA056d488dCbd34ae0Aa4b11a3b56531090_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A group of AInauts in a space station watching as a massive asteroid hurtles towards Earth, with only their AI and technology to save them."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AGroupOfAinautsInASpaceStationWatchingAsA056d488dCbd34ae0Aa4b11a3b56531090_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AGroupOfAinautsInASpaceStationWatchingAsA056d488dCbd34ae0Aa4b11a3b56531090_3_Image.colorStats =
    hydrateColorStats(colorStats);
AGroupOfAinautsInASpaceStationWatchingAsA056d488dCbd34ae0Aa4b11a3b56531090_3_Image.texts =
    texts satisfies IWallpaperTexts;
