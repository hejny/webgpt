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
import colorStats from './Pavol_Hejn_a_retro_futuristic_wallpaper_featuring_a_vintage_ill_c7551116-1306-4d89-b90c-465a2d6bc13d-0_3.colors.json';
import metadata from './Pavol_Hejn_a_retro_futuristic_wallpaper_featuring_a_vintage_ill_c7551116-1306-4d89-b90c-465a2d6bc13d-0_3.json';
import source from 'https://cdn.midjourney.com/c7551116-1306-4d89-b90c-465a2d6bc13d/0_3.png';
import texts from './Pavol_Hejn_a_retro_futuristic_wallpaper_featuring_a_vintage_ill_c7551116-1306-4d89-b90c-465a2d6bc13d-0_3.texts.json';

/**
 * Image of A retro-futuristic wallpaper featuring a vintage illustration of a robot, set against a neon-colored background.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ARetroFuturisticWallpaperFeaturingAVintageIllC755111613064d89B90c465a2d6bc13d0_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A retro-futuristic wallpaper featuring a vintage illustration of a robot, set against a neon-colored background."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ARetroFuturisticWallpaperFeaturingAVintageIllC755111613064d89B90c465a2d6bc13d0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ARetroFuturisticWallpaperFeaturingAVintageIllC755111613064d89B90c465a2d6bc13d0_3_Image.colorStats =
    hydrateColorStats(colorStats);
ARetroFuturisticWallpaperFeaturingAVintageIllC755111613064d89B90c465a2d6bc13d0_3_Image.texts =
    texts satisfies IWallpaperTexts;
