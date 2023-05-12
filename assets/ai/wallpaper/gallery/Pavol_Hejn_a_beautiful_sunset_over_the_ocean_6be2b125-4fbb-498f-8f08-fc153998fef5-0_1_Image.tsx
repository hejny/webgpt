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
import colorStats from './Pavol_Hejn_a_beautiful_sunset_over_the_ocean_6be2b125-4fbb-498f-8f08-fc153998fef5-0_1.colors.json';
import metadata from './Pavol_Hejn_a_beautiful_sunset_over_the_ocean_6be2b125-4fbb-498f-8f08-fc153998fef5-0_1.json';
import source from 'https://cdn.midjourney.com/6be2b125-4fbb-498f-8f08-fc153998fef5/0_1.png';
import texts from './Pavol_Hejn_a_beautiful_sunset_over_the_ocean_6be2b125-4fbb-498f-8f08-fc153998fef5-0_1.texts.json';

/**
 * Image of A beautiful sunset over the ocean
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ABeautifulSunsetOverTheOcean6be2b1254fbb498f8f08Fc153998fef50_1_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A beautiful sunset over the ocean"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ABeautifulSunsetOverTheOcean6be2b1254fbb498f8f08Fc153998fef50_1_Image.metadata = metadata satisfies IWallpaperMetadata;
ABeautifulSunsetOverTheOcean6be2b1254fbb498f8f08Fc153998fef50_1_Image.colorStats = hydrateColorStats(colorStats);
ABeautifulSunsetOverTheOcean6be2b1254fbb498f8f08Fc153998fef50_1_Image.texts = texts satisfies IWallpaperTexts;
