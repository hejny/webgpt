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
import colorStats from './Pavol_Hejn_a_team_of_ainauts_working_together_to_explore_the_de_9fd062d6-1914-4eeb-85fe-3e3df6917b1f-0_0.colors.json';
import metadata from './Pavol_Hejn_a_team_of_ainauts_working_together_to_explore_the_de_9fd062d6-1914-4eeb-85fe-3e3df6917b1f-0_0.json';
import texts from './Pavol_Hejn_a_team_of_ainauts_working_together_to_explore_the_de_9fd062d6-1914-4eeb-85fe-3e3df6917b1f-0_0.texts.json';

/**
 * Image of A team of AInauts working together to explore the depths of a black hole, with futuristic technology at their fingertips.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ATeamOfAinautsWorkingTogetherToExploreTheDe9fd062d619144eeb85fe3e3df6917b1f0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A team of AInauts working together to explore the depths of a black hole, with futuristic technology at their fingertips."
            src="https://cdn.midjourney.com/9fd062d6-1914-4eeb-85fe-3e3df6917b1f/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ATeamOfAinautsWorkingTogetherToExploreTheDe9fd062d619144eeb85fe3e3df6917b1f0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ATeamOfAinautsWorkingTogetherToExploreTheDe9fd062d619144eeb85fe3e3df6917b1f0_0_Image.colorStats =
    hydrateColorStats(colorStats);
ATeamOfAinautsWorkingTogetherToExploreTheDe9fd062d619144eeb85fe3e3df6917b1f0_0_Image.texts =
    texts satisfies IWallpaperTexts;
