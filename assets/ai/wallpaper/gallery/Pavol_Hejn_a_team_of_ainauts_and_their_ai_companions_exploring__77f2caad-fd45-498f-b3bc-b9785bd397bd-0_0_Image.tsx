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
import colorStats from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_exploring__77f2caad-fd45-498f-b3bc-b9785bd397bd-0_0.colors.json';
import metadata from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_exploring__77f2caad-fd45-498f-b3bc-b9785bd397bd-0_0.json';
import source from 'https://cdn.midjourney.com/77f2caad-fd45-498f-b3bc-b9785bd397bd/0_0.png';
import texts from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_exploring__77f2caad-fd45-498f-b3bc-b9785bd397bd-0_0.texts.json';

/**
 * Image of A team of AInauts and their AI companions exploring a massive, underground cave system on a distant planet.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ATeamOfAinautsAndTheirAiCompanionsExploring77f2caadFd45498fB3bcB9785bd397bd0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A team of AInauts and their AI companions exploring a massive, underground cave system on a distant planet."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ATeamOfAinautsAndTheirAiCompanionsExploring77f2caadFd45498fB3bcB9785bd397bd0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ATeamOfAinautsAndTheirAiCompanionsExploring77f2caadFd45498fB3bcB9785bd397bd0_0_Image.colorStats =
    hydrateColorStats(colorStats);
ATeamOfAinautsAndTheirAiCompanionsExploring77f2caadFd45498fB3bcB9785bd397bd0_0_Image.texts =
    texts satisfies IWallpaperTexts;
