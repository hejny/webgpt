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
import colorStats from './Pavol_Hejn_a_team_of_ainauts_conducting_experiments_on_a_massiv_6e1d22ae-ba5e-4476-80f3-dba42c1988cf-0_2.colors.json';
import metadata from './Pavol_Hejn_a_team_of_ainauts_conducting_experiments_on_a_massiv_6e1d22ae-ba5e-4476-80f3-dba42c1988cf-0_2.json';
import source from 'https://cdn.midjourney.com/6e1d22ae-ba5e-4476-80f3-dba42c1988cf/0_2.png';
import texts from './Pavol_Hejn_a_team_of_ainauts_conducting_experiments_on_a_massiv_6e1d22ae-ba5e-4476-80f3-dba42c1988cf-0_2.texts.json';

/**
 * Image of A team of AInauts conducting experiments on a massive, frozen moon orbiting a gas giant planet.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ATeamOfAinautsConductingExperimentsOnAMassiv6e1d22aeBa5e447680f3Dba42c1988cf0_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A team of AInauts conducting experiments on a massive, frozen moon orbiting a gas giant planet."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ATeamOfAinautsConductingExperimentsOnAMassiv6e1d22aeBa5e447680f3Dba42c1988cf0_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ATeamOfAinautsConductingExperimentsOnAMassiv6e1d22aeBa5e447680f3Dba42c1988cf0_2_Image.colorStats =
    hydrateColorStats(colorStats);
ATeamOfAinautsConductingExperimentsOnAMassiv6e1d22aeBa5e447680f3Dba42c1988cf0_2_Image.texts =
    texts satisfies IWallpaperTexts;
