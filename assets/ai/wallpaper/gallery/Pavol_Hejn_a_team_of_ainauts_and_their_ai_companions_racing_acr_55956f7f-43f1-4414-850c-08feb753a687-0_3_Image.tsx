/**
 * 🏭 GENERATED WITH 🖼️ Generate wallpapers library
 * ⚠️ Warning: Do not edit by hand, all changes will be lost on next execution!
 *    If you want to edit this file:
 *      - Change @generated to @not-generated
 *      - And remove this warning
 *    Then the file will not be re-generated automatically
 */
import Image from 'next/image';
import { Color } from '../../../../src/utils/color/Color';
import { colorToDataUrl } from '../../../../src/utils/color/utils/colorToDataUrl';
import { hydrateColorStats } from '../../../../src/utils/image/utils/hydrateColorStats';
import { IWallpaperComponentProps, IWallpaperMetadata, IWallpaperTexts } from '../IWallpaperComponent';
import colorStats from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_racing_acr_55956f7f-43f1-4414-850c-08feb753a687-0_3.colors.json';
import metadata from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_racing_acr_55956f7f-43f1-4414-850c-08feb753a687-0_3.json';
import texts from './Pavol_Hejn_a_team_of_ainauts_and_their_ai_companions_racing_acr_55956f7f-43f1-4414-850c-08feb753a687-0_3.texts.json';

/**
 * Image of A team of AInauts and their AI companions racing across the surface of a desert planet in high-tech buggies.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ATeamOfAinautsAndTheirAiCompanionsRacingAcr55956f7f43f14414850c08feb753a6870_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A team of AInauts and their AI companions racing across the surface of a desert planet in high-tech buggies."
            src="https://cdn.midjourney.com/55956f7f-43f1-4414-850c-08feb753a687/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ATeamOfAinautsAndTheirAiCompanionsRacingAcr55956f7f43f14414850c08feb753a6870_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ATeamOfAinautsAndTheirAiCompanionsRacingAcr55956f7f43f14414850c08feb753a6870_3_Image.colorStats =
    hydrateColorStats(colorStats);
ATeamOfAinautsAndTheirAiCompanionsRacingAcr55956f7f43f14414850c08feb753a6870_3_Image.texts =
    texts satisfies IWallpaperTexts;
