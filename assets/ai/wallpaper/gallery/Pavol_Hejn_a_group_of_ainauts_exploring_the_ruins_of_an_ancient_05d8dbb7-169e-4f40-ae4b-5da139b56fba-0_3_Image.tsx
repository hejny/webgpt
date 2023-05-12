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
import colorStats from './Pavol_Hejn_a_group_of_ainauts_exploring_the_ruins_of_an_ancient_05d8dbb7-169e-4f40-ae4b-5da139b56fba-0_3.colors.json';
import metadata from './Pavol_Hejn_a_group_of_ainauts_exploring_the_ruins_of_an_ancient_05d8dbb7-169e-4f40-ae4b-5da139b56fba-0_3.json';
import source from 'https://cdn.midjourney.com/05d8dbb7-169e-4f40-ae4b-5da139b56fba/0_3.png';
import texts from './Pavol_Hejn_a_group_of_ainauts_exploring_the_ruins_of_an_ancient_05d8dbb7-169e-4f40-ae4b-5da139b56fba-0_3.texts.json';

/**
 * Image of A group of AInauts exploring the ruins of an ancient civilization on a distant planet, with towering statues and temples all around them.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AGroupOfAinautsExploringTheRuinsOfAnAncient05d8dbb7169e4f40Ae4b5da139b56fba0_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A group of AInauts exploring the ruins of an ancient civilization on a distant planet, with towering statues and temples all around them."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AGroupOfAinautsExploringTheRuinsOfAnAncient05d8dbb7169e4f40Ae4b5da139b56fba0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AGroupOfAinautsExploringTheRuinsOfAnAncient05d8dbb7169e4f40Ae4b5da139b56fba0_3_Image.colorStats =
    hydrateColorStats(colorStats);
AGroupOfAinautsExploringTheRuinsOfAnAncient05d8dbb7169e4f40Ae4b5da139b56fba0_3_Image.texts =
    texts satisfies IWallpaperTexts;
