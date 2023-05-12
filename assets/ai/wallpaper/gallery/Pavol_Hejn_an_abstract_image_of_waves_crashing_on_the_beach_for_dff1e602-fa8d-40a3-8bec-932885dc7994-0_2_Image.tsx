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
import colorStats from './Pavol_Hejn_an_abstract_image_of_waves_crashing_on_the_beach_for_dff1e602-fa8d-40a3-8bec-932885dc7994-0_2.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_waves_crashing_on_the_beach_for_dff1e602-fa8d-40a3-8bec-932885dc7994-0_2.json';
import source from 'https://cdn.midjourney.com/dff1e602-fa8d-40a3-8bec-932885dc7994/0_2.png';
import texts from './Pavol_Hejn_an_abstract_image_of_waves_crashing_on_the_beach_for_dff1e602-fa8d-40a3-8bec-932885dc7994-0_2.texts.json';

/**
 * Image of An abstract image of waves crashing on the beach for a vacation or travel website
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfWavesCrashingOnTheBeachForDff1e602Fa8d40a38bec932885dc79940_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of waves crashing on the beach for a vacation or travel website"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfWavesCrashingOnTheBeachForDff1e602Fa8d40a38bec932885dc79940_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfWavesCrashingOnTheBeachForDff1e602Fa8d40a38bec932885dc79940_2_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfWavesCrashingOnTheBeachForDff1e602Fa8d40a38bec932885dc79940_2_Image.texts =
    texts satisfies IWallpaperTexts;
