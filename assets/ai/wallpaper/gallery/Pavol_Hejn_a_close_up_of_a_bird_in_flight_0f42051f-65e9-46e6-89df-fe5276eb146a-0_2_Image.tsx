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
import colorStats from './Pavol_Hejn_a_close_up_of_a_bird_in_flight_0f42051f-65e9-46e6-89df-fe5276eb146a-0_2.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_a_bird_in_flight_0f42051f-65e9-46e6-89df-fe5276eb146a-0_2.json';
import source from 'https://cdn.midjourney.com/0f42051f-65e9-46e6-89df-fe5276eb146a/0_2.png';
import texts from './Pavol_Hejn_a_close_up_of_a_bird_in_flight_0f42051f-65e9-46e6-89df-fe5276eb146a-0_2.texts.json';

/**
 * Image of A close-up of a bird in flight
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfABirdInFlight0f42051f65e946e689dfFe5276eb146a0_2_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up of a bird in flight"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpOfABirdInFlight0f42051f65e946e689dfFe5276eb146a0_2_Image.metadata = metadata satisfies IWallpaperMetadata;
ACloseUpOfABirdInFlight0f42051f65e946e689dfFe5276eb146a0_2_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfABirdInFlight0f42051f65e946e689dfFe5276eb146a0_2_Image.texts = texts satisfies IWallpaperTexts;
