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
import colorStats from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_exploring__79466e0d-4625-406a-8266-c87026f7629a-0_1.colors.json';
import metadata from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_exploring__79466e0d-4625-406a-8266-c87026f7629a-0_1.json';
import source from 'https://cdn.midjourney.com/79466e0d-4625-406a-8266-c87026f7629a/0_1.png';
import texts from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_exploring__79466e0d-4625-406a-8266-c87026f7629a-0_1.texts.json';

/**
 * Image of A team of AInauts and their AI companions exploring a massive, abandoned alien spacecraft floating in the depths of space.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ATeamOfAinautsAndTheirAiCompanionsExploring79466e0d4625406a8266C87026f7629a0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A team of AInauts and their AI companions exploring a massive, abandoned alien spacecraft floating in the depths of space."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ATeamOfAinautsAndTheirAiCompanionsExploring79466e0d4625406a8266C87026f7629a0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ATeamOfAinautsAndTheirAiCompanionsExploring79466e0d4625406a8266C87026f7629a0_1_Image.colorStats =
    hydrateColorStats(colorStats);
ATeamOfAinautsAndTheirAiCompanionsExploring79466e0d4625406a8266C87026f7629a0_1_Image.texts =
    texts satisfies IWallpaperTexts;
