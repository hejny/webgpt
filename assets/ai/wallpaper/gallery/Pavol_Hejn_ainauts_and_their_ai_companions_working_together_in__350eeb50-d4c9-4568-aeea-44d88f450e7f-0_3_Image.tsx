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
import colorStats from './Pavol_Hejn_ainauts_and_their_ai_companions_working_together_in__350eeb50-d4c9-4568-aeea-44d88f450e7f-0_3.colors.json';
import metadata from './Pavol_Hejn_ainauts_and_their_ai_companions_working_together_in__350eeb50-d4c9-4568-aeea-44d88f450e7f-0_3.json';
import source from 'https://cdn.midjourney.com/350eeb50-d4c9-4568-aeea-44d88f450e7f/0_3.png';
import texts from './Pavol_Hejn_ainauts_and_their_ai_companions_working_together_in__350eeb50-d4c9-4568-aeea-44d88f450e7f-0_3.texts.json';

/**
 * Image of AInauts and their AI companions working together in a massive, zero-gravity space station.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AinautsAndTheirAiCompanionsWorkingTogetherIn50eeb50D4c94568Aeea44d88f450e7f03_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="AInauts and their AI companions working together in a massive, zero-gravity space station."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AinautsAndTheirAiCompanionsWorkingTogetherIn50eeb50D4c94568Aeea44d88f450e7f03_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AinautsAndTheirAiCompanionsWorkingTogetherIn50eeb50D4c94568Aeea44d88f450e7f03_3_Image.colorStats =
    hydrateColorStats(colorStats);
AinautsAndTheirAiCompanionsWorkingTogetherIn50eeb50D4c94568Aeea44d88f450e7f03_3_Image.texts =
    texts satisfies IWallpaperTexts;
