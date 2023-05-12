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
import colorStats from './Pavol_Hejn_a_futuristic_spacecraft_crewed_entirely_by_ainauts_h_b9d9be36-8607-4cbc-aa8d-3ee78d57d165-0_1.colors.json';
import metadata from './Pavol_Hejn_a_futuristic_spacecraft_crewed_entirely_by_ainauts_h_b9d9be36-8607-4cbc-aa8d-3ee78d57d165-0_1.json';
import source from 'https://cdn.midjourney.com/b9d9be36-8607-4cbc-aa8d-3ee78d57d165/0_1.png';
import texts from './Pavol_Hejn_a_futuristic_spacecraft_crewed_entirely_by_ainauts_h_b9d9be36-8607-4cbc-aa8d-3ee78d57d165-0_1.texts.json';

/**
 * Image of A futuristic spacecraft crewed entirely by AInauts, hurtling through space at incredible speeds.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AFuturisticSpacecraftCrewedEntirelyByAinautsHB9d9be3686074cbcAa8d3ee78d57d1650_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A futuristic spacecraft crewed entirely by AInauts, hurtling through space at incredible speeds."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AFuturisticSpacecraftCrewedEntirelyByAinautsHB9d9be3686074cbcAa8d3ee78d57d1650_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AFuturisticSpacecraftCrewedEntirelyByAinautsHB9d9be3686074cbcAa8d3ee78d57d1650_1_Image.colorStats =
    hydrateColorStats(colorStats);
AFuturisticSpacecraftCrewedEntirelyByAinautsHB9d9be3686074cbcAa8d3ee78d57d1650_1_Image.texts =
    texts satisfies IWallpaperTexts;
