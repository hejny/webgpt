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
import colorStats from './Pavol_Hejn_a_futuristic_spaceship_crewed_entirely_by_ainauts_tr_9d15355f-6600-4660-bcaa-020399f6294a-0_1.colors.json';
import metadata from './Pavol_Hejn_a_futuristic_spaceship_crewed_entirely_by_ainauts_tr_9d15355f-6600-4660-bcaa-020399f6294a-0_1.json';
import source from 'https://cdn.midjourney.com/9d15355f-6600-4660-bcaa-020399f6294a/0_1.png';
import texts from './Pavol_Hejn_a_futuristic_spaceship_crewed_entirely_by_ainauts_tr_9d15355f-6600-4660-bcaa-020399f6294a-0_1.texts.json';

/**
 * Image of A futuristic spaceship crewed entirely by AInauts, traveling through the vast expanse of space on a mission of discovery.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AFuturisticSpaceshipCrewedEntirelyByAinautsTr9d15355f66004660Bcaa020399f6294a0_1_Image(
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

AFuturisticSpaceshipCrewedEntirelyByAinautsTr9d15355f66004660Bcaa020399f6294a0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AFuturisticSpaceshipCrewedEntirelyByAinautsTr9d15355f66004660Bcaa020399f6294a0_1_Image.colorStats =
    hydrateColorStats(colorStats);
AFuturisticSpaceshipCrewedEntirelyByAinautsTr9d15355f66004660Bcaa020399f6294a0_1_Image.texts =
    texts satisfies IWallpaperTexts;
