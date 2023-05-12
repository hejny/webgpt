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
import colorStats from './Pavol_Hejn_a_close_up_of_a_bee_on_a_flower_d508a146-6242-43d8-8d89-a0db7e936f73-0_2.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_a_bee_on_a_flower_d508a146-6242-43d8-8d89-a0db7e936f73-0_2.json';
import source from 'https://cdn.midjourney.com/d508a146-6242-43d8-8d89-a0db7e936f73/0_2.png';
import texts from './Pavol_Hejn_a_close_up_of_a_bee_on_a_flower_d508a146-6242-43d8-8d89-a0db7e936f73-0_2.texts.json';

/**
 * Image of A close-up of a bee on a flower
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfABeeOnAFlowerD508a146624243d88d89A0db7e936f730_2_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up of a bee on a flower"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpOfABeeOnAFlowerD508a146624243d88d89A0db7e936f730_2_Image.metadata = metadata satisfies IWallpaperMetadata;
ACloseUpOfABeeOnAFlowerD508a146624243d88d89A0db7e936f730_2_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfABeeOnAFlowerD508a146624243d88d89A0db7e936f730_2_Image.texts = texts satisfies IWallpaperTexts;
