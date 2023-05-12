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
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_single_graphic_of_a_futuristic_ci_39a50bb2-bfe7-43cb-a6c9-56666ffc50d3-0_0.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_single_graphic_of_a_futuristic_ci_39a50bb2-bfe7-43cb-a6c9-56666ffc50d3-0_0.json';
import source from 'https://cdn.midjourney.com/39a50bb2-bfe7-43cb-a6c9-56666ffc50d3/0_0.png';
import texts from './Pavol_Hejn_a_wallpaper_with_a_single_graphic_of_a_futuristic_ci_39a50bb2-bfe7-43cb-a6c9-56666ffc50d3-0_0.texts.json';

/**
 * Image of A wallpaper with a single graphic of a futuristic cityscape, in a solid color such as orange or green.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithASingleGraphicOfAFuturisticCi39a50bb2Bfe743cbA6c956666ffc50d30_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a single graphic of a futuristic cityscape, in a solid color such as orange or green."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithASingleGraphicOfAFuturisticCi39a50bb2Bfe743cbA6c956666ffc50d30_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithASingleGraphicOfAFuturisticCi39a50bb2Bfe743cbA6c956666ffc50d30_0_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithASingleGraphicOfAFuturisticCi39a50bb2Bfe743cbA6c956666ffc50d30_0_Image.texts =
    texts satisfies IWallpaperTexts;
