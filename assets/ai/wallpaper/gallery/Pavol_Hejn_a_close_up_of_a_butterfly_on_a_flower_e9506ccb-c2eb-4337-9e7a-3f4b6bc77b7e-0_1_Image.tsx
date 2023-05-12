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
import colorStats from './Pavol_Hejn_a_close_up_of_a_butterfly_on_a_flower_e9506ccb-c2eb-4337-9e7a-3f4b6bc77b7e-0_1.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_a_butterfly_on_a_flower_e9506ccb-c2eb-4337-9e7a-3f4b6bc77b7e-0_1.json';
import source from 'https://cdn.midjourney.com/e9506ccb-c2eb-4337-9e7a-3f4b6bc77b7e/0_1.png';
import texts from './Pavol_Hejn_a_close_up_of_a_butterfly_on_a_flower_e9506ccb-c2eb-4337-9e7a-3f4b6bc77b7e-0_1.texts.json';

/**
 * Image of A close-up of a butterfly on a flower
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfAButterflyOnAFlowerE9506ccbC2eb43379e7a3f4b6bc77b7e0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up of a butterfly on a flower"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpOfAButterflyOnAFlowerE9506ccbC2eb43379e7a3f4b6bc77b7e0_1_Image.metadata = metadata satisfies IWallpaperMetadata;
ACloseUpOfAButterflyOnAFlowerE9506ccbC2eb43379e7a3f4b6bc77b7e0_1_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfAButterflyOnAFlowerE9506ccbC2eb43379e7a3f4b6bc77b7e0_1_Image.texts = texts satisfies IWallpaperTexts;
