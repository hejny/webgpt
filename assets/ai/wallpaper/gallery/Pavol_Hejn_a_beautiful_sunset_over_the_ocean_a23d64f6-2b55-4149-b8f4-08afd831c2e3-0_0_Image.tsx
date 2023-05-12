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
import colorStats from './Pavol_Hejn_a_beautiful_sunset_over_the_ocean_a23d64f6-2b55-4149-b8f4-08afd831c2e3-0_0.colors.json';
import metadata from './Pavol_Hejn_a_beautiful_sunset_over_the_ocean_a23d64f6-2b55-4149-b8f4-08afd831c2e3-0_0.json';
import source from 'https://cdn.midjourney.com/a23d64f6-2b55-4149-b8f4-08afd831c2e3/0_0.png';
import texts from './Pavol_Hejn_a_beautiful_sunset_over_the_ocean_a23d64f6-2b55-4149-b8f4-08afd831c2e3-0_0.texts.json';

/**
 * Image of A beautiful sunset over the ocean
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ABeautifulSunsetOverTheOceanA23d64f62b554149B8f408afd831c2e30_0_Image(props: IWallpaperComponentProps) {
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

ABeautifulSunsetOverTheOceanA23d64f62b554149B8f408afd831c2e30_0_Image.metadata = metadata satisfies IWallpaperMetadata;
ABeautifulSunsetOverTheOceanA23d64f62b554149B8f408afd831c2e30_0_Image.colorStats = hydrateColorStats(colorStats);
ABeautifulSunsetOverTheOceanA23d64f62b554149B8f408afd831c2e30_0_Image.texts = texts satisfies IWallpaperTexts;
