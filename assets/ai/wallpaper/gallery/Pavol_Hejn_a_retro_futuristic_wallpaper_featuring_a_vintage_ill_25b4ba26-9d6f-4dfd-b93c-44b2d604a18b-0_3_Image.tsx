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
import colorStats from './Pavol_Hejn_a_retro_futuristic_wallpaper_featuring_a_vintage_ill_25b4ba26-9d6f-4dfd-b93c-44b2d604a18b-0_3.colors.json';
import metadata from './Pavol_Hejn_a_retro_futuristic_wallpaper_featuring_a_vintage_ill_25b4ba26-9d6f-4dfd-b93c-44b2d604a18b-0_3.json';
import source from 'https://cdn.midjourney.com/25b4ba26-9d6f-4dfd-b93c-44b2d604a18b/0_3.png';
import texts from './Pavol_Hejn_a_retro_futuristic_wallpaper_featuring_a_vintage_ill_25b4ba26-9d6f-4dfd-b93c-44b2d604a18b-0_3.texts.json';

/**
 * Image of A retro-futuristic wallpaper featuring a vintage illustration of a robot, set against a neon-colored background.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ARetroFuturisticWallpaperFeaturingAVintageIll25b4ba269d6f4dfdB93c44b2d604a18b0_3_Image(
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

ARetroFuturisticWallpaperFeaturingAVintageIll25b4ba269d6f4dfdB93c44b2d604a18b0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ARetroFuturisticWallpaperFeaturingAVintageIll25b4ba269d6f4dfdB93c44b2d604a18b0_3_Image.colorStats =
    hydrateColorStats(colorStats);
ARetroFuturisticWallpaperFeaturingAVintageIll25b4ba269d6f4dfdB93c44b2d604a18b0_3_Image.texts =
    texts satisfies IWallpaperTexts;
