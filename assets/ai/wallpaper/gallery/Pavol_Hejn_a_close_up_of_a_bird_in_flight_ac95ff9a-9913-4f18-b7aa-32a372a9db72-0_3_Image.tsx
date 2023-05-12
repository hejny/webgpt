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
import colorStats from './Pavol_Hejn_a_close_up_of_a_bird_in_flight_ac95ff9a-9913-4f18-b7aa-32a372a9db72-0_3.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_a_bird_in_flight_ac95ff9a-9913-4f18-b7aa-32a372a9db72-0_3.json';
import source from 'https://cdn.midjourney.com/ac95ff9a-9913-4f18-b7aa-32a372a9db72/0_3.png';
import texts from './Pavol_Hejn_a_close_up_of_a_bird_in_flight_ac95ff9a-9913-4f18-b7aa-32a372a9db72-0_3.texts.json';

/**
 * Image of A close-up of a bird in flight
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfABirdInFlightAc95ff9a99134f18B7aa32a372a9db720_3_Image(props: IWallpaperComponentProps) {
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

ACloseUpOfABirdInFlightAc95ff9a99134f18B7aa32a372a9db720_3_Image.metadata = metadata satisfies IWallpaperMetadata;
ACloseUpOfABirdInFlightAc95ff9a99134f18B7aa32a372a9db720_3_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfABirdInFlightAc95ff9a99134f18B7aa32a372a9db720_3_Image.texts = texts satisfies IWallpaperTexts;
