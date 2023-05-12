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
import colorStats from './Pavol_Hejn_a_futuristic_spaceship_crewed_entirely_by_ainauts_tr_eb8be439-1dba-44de-85c7-782b8683e265-0_3.colors.json';
import metadata from './Pavol_Hejn_a_futuristic_spaceship_crewed_entirely_by_ainauts_tr_eb8be439-1dba-44de-85c7-782b8683e265-0_3.json';
import source from 'https://cdn.midjourney.com/eb8be439-1dba-44de-85c7-782b8683e265/0_3.png';
import texts from './Pavol_Hejn_a_futuristic_spaceship_crewed_entirely_by_ainauts_tr_eb8be439-1dba-44de-85c7-782b8683e265-0_3.texts.json';

/**
 * Image of A futuristic spaceship crewed entirely by AInauts, traveling through the vast expanse of space on a mission of discovery.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AFuturisticSpaceshipCrewedEntirelyByAinautsTrEb8be4391dba44de85c7782b8683e2650_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A futuristic spaceship crewed entirely by AInauts, traveling through the vast expanse of space on a mission of discovery."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AFuturisticSpaceshipCrewedEntirelyByAinautsTrEb8be4391dba44de85c7782b8683e2650_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AFuturisticSpaceshipCrewedEntirelyByAinautsTrEb8be4391dba44de85c7782b8683e2650_3_Image.colorStats =
    hydrateColorStats(colorStats);
AFuturisticSpaceshipCrewedEntirelyByAinautsTrEb8be4391dba44de85c7782b8683e2650_3_Image.texts =
    texts satisfies IWallpaperTexts;
