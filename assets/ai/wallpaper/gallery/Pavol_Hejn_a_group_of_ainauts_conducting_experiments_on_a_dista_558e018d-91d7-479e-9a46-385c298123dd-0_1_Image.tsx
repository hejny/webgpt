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
import colorStats from './Pavol_Hejn_a_group_of_ainauts_conducting_experiments_on_a_dista_558e018d-91d7-479e-9a46-385c298123dd-0_1.colors.json';
import metadata from './Pavol_Hejn_a_group_of_ainauts_conducting_experiments_on_a_dista_558e018d-91d7-479e-9a46-385c298123dd-0_1.json';
import source from 'https://cdn.midjourney.com/558e018d-91d7-479e-9a46-385c298123dd/0_1.png';
import texts from './Pavol_Hejn_a_group_of_ainauts_conducting_experiments_on_a_dista_558e018d-91d7-479e-9a46-385c298123dd-0_1.texts.json';

/**
 * Image of A group of AInauts conducting experiments on a distant planet, with a red sun setting behind them.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AGroupOfAinautsConductingExperimentsOnADista558e018d91d7479e9a46385c298123dd0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A group of AInauts conducting experiments on a distant planet, with a red sun setting behind them."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AGroupOfAinautsConductingExperimentsOnADista558e018d91d7479e9a46385c298123dd0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AGroupOfAinautsConductingExperimentsOnADista558e018d91d7479e9a46385c298123dd0_1_Image.colorStats =
    hydrateColorStats(colorStats);
AGroupOfAinautsConductingExperimentsOnADista558e018d91d7479e9a46385c298123dd0_1_Image.texts =
    texts satisfies IWallpaperTexts;
