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
import colorStats from './Pavol_Hejn_a_wallpaper_featuring_a_collage_of_futuristic_techno_a61d8392-6cb0-4241-aa9a-96f23c0bbb65-0_3.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_featuring_a_collage_of_futuristic_techno_a61d8392-6cb0-4241-aa9a-96f23c0bbb65-0_3.json';
import source from 'https://cdn.midjourney.com/a61d8392-6cb0-4241-aa9a-96f23c0bbb65/0_3.png';
import texts from './Pavol_Hejn_a_wallpaper_featuring_a_collage_of_futuristic_techno_a61d8392-6cb0-4241-aa9a-96f23c0bbb65-0_3.texts.json';

/**
 * Image of A wallpaper featuring a collage of futuristic technology such as drones, robots, and smart devices, set against a black background.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AWallpaperFeaturingACollageOfFuturisticTechnoA61d83926cb04241Aa9a96f23c0bbb650_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper featuring a collage of futuristic technology such as drones, robots, and smart devices, set against a black background."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperFeaturingACollageOfFuturisticTechnoA61d83926cb04241Aa9a96f23c0bbb650_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperFeaturingACollageOfFuturisticTechnoA61d83926cb04241Aa9a96f23c0bbb650_3_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperFeaturingACollageOfFuturisticTechnoA61d83926cb04241Aa9a96f23c0bbb650_3_Image.texts =
    texts satisfies IWallpaperTexts;
