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
import colorStats from './Pavol_Hejn_a_dramatic_image_of_a_thunderstorm_over_a_city_skyli_70f22bd8-903b-494e-b7d3-4da5876a06b8-0_2.colors.json';
import metadata from './Pavol_Hejn_a_dramatic_image_of_a_thunderstorm_over_a_city_skyli_70f22bd8-903b-494e-b7d3-4da5876a06b8-0_2.json';
import source from 'https://cdn.midjourney.com/70f22bd8-903b-494e-b7d3-4da5876a06b8/0_2.png';
import texts from './Pavol_Hejn_a_dramatic_image_of_a_thunderstorm_over_a_city_skyli_70f22bd8-903b-494e-b7d3-4da5876a06b8-0_2.texts.json';

/**
 * Image of A dramatic image of a thunderstorm over a city skyline for a weather or news website.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ADramaticImageOfAThunderstormOverACitySkyli70f22bd8903b494eB7d34da5876a06b80_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A dramatic image of a thunderstorm over a city skyline for a weather or news website."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ADramaticImageOfAThunderstormOverACitySkyli70f22bd8903b494eB7d34da5876a06b80_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ADramaticImageOfAThunderstormOverACitySkyli70f22bd8903b494eB7d34da5876a06b80_2_Image.colorStats =
    hydrateColorStats(colorStats);
ADramaticImageOfAThunderstormOverACitySkyli70f22bd8903b494eB7d34da5876a06b80_2_Image.texts =
    texts satisfies IWallpaperTexts;
