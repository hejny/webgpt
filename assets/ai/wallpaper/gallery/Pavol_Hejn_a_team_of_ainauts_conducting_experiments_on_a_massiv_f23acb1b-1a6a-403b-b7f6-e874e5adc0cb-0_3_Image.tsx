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
import colorStats from './Pavol_Hejn_a_team_of_ainauts_conducting_experiments_on_a_massiv_f23acb1b-1a6a-403b-b7f6-e874e5adc0cb-0_3.colors.json';
import metadata from './Pavol_Hejn_a_team_of_ainauts_conducting_experiments_on_a_massiv_f23acb1b-1a6a-403b-b7f6-e874e5adc0cb-0_3.json';
import texts from './Pavol_Hejn_a_team_of_ainauts_conducting_experiments_on_a_massiv_f23acb1b-1a6a-403b-b7f6-e874e5adc0cb-0_3.texts.json';

/**
 * Image of A team of AInauts conducting experiments on a massive, frozen moon orbiting a gas giant planet.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ATeamOfAinautsConductingExperimentsOnAMassivF23acb1b1a6a403bB7f6E874e5adc0cb0_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A team of AInauts conducting experiments on a massive, frozen moon orbiting a gas giant planet."
            src="https://cdn.midjourney.com/f23acb1b-1a6a-403b-b7f6-e874e5adc0cb/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ATeamOfAinautsConductingExperimentsOnAMassivF23acb1b1a6a403bB7f6E874e5adc0cb0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ATeamOfAinautsConductingExperimentsOnAMassivF23acb1b1a6a403bB7f6E874e5adc0cb0_3_Image.colorStats =
    hydrateColorStats(colorStats);
ATeamOfAinautsConductingExperimentsOnAMassivF23acb1b1a6a403bB7f6E874e5adc0cb0_3_Image.texts =
    texts satisfies IWallpaperTexts;
