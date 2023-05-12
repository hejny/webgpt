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
import colorStats from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_exploring__170a670c-46d1-48e9-ac08-b3e2453b45ae-0_2.colors.json';
import metadata from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_exploring__170a670c-46d1-48e9-ac08-b3e2453b45ae-0_2.json';
import source from 'https://cdn.midjourney.com/170a670c-46d1-48e9-ac08-b3e2453b45ae/0_2.png';
import texts from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_exploring__170a670c-46d1-48e9-ac08-b3e2453b45ae-0_2.texts.json';

/**
 * Image of A team of AInauts and their AI companions exploring a massive, ancient space station orbiting a distant planet.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ATeamOfAinautsAndTheirAiCompanionsExploring170a670c46d148e9Ac08B3e2453b45ae0_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A team of AInauts and their AI companions exploring a massive, ancient space station orbiting a distant planet."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ATeamOfAinautsAndTheirAiCompanionsExploring170a670c46d148e9Ac08B3e2453b45ae0_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ATeamOfAinautsAndTheirAiCompanionsExploring170a670c46d148e9Ac08B3e2453b45ae0_2_Image.colorStats =
    hydrateColorStats(colorStats);
ATeamOfAinautsAndTheirAiCompanionsExploring170a670c46d148e9Ac08B3e2453b45ae0_2_Image.texts =
    texts satisfies IWallpaperTexts;
