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
import colorStats from './Pavol_Hejn_a_team_of_ainauts_piloting_a_spacecraft_through_an_a_fdda81ab-66db-466e-90c1-d4baa1159494-0_0.colors.json';
import metadata from './Pavol_Hejn_a_team_of_ainauts_piloting_a_spacecraft_through_an_a_fdda81ab-66db-466e-90c1-d4baa1159494-0_0.json';
import texts from './Pavol_Hejn_a_team_of_ainauts_piloting_a_spacecraft_through_an_a_fdda81ab-66db-466e-90c1-d4baa1159494-0_0.texts.json';

/**
 * Image of A team of AInauts piloting a spacecraft through an asteroid field, with explosions and debris flying all around them.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ATeamOfAinautsPilotingASpacecraftThroughAnAFdda81ab66db466e90c1D4baa11594940_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A team of AInauts piloting a spacecraft through an asteroid field, with explosions and debris flying all around them."
            src="https://cdn.midjourney.com/fdda81ab-66db-466e-90c1-d4baa1159494/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ATeamOfAinautsPilotingASpacecraftThroughAnAFdda81ab66db466e90c1D4baa11594940_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ATeamOfAinautsPilotingASpacecraftThroughAnAFdda81ab66db466e90c1D4baa11594940_0_Image.colorStats =
    hydrateColorStats(colorStats);
ATeamOfAinautsPilotingASpacecraftThroughAnAFdda81ab66db466e90c1D4baa11594940_0_Image.texts =
    texts satisfies IWallpaperTexts;
