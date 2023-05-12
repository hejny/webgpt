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
import colorStats from './Pavol_Hejn_a_pixel_art_inspired_wallpaper_featuring_a_retro_sty_10e6d742-d354-42a9-8c19-ca72846339e7-0_0.colors.json';
import metadata from './Pavol_Hejn_a_pixel_art_inspired_wallpaper_featuring_a_retro_sty_10e6d742-d354-42a9-8c19-ca72846339e7-0_0.json';
import source from 'https://cdn.midjourney.com/10e6d742-d354-42a9-8c19-ca72846339e7/0_0.png';
import texts from './Pavol_Hejn_a_pixel_art_inspired_wallpaper_featuring_a_retro_sty_10e6d742-d354-42a9-8c19-ca72846339e7-0_0.texts.json';

/**
 * Image of A pixel art-inspired wallpaper featuring a retro-style robot, with a limited color palette and pixelated lines.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function APixelArtInspiredWallpaperFeaturingARetroSty10e6d742D35442a98c19Ca72846339e70_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A pixel art-inspired wallpaper featuring a retro-style robot, with a limited color palette and pixelated lines."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

APixelArtInspiredWallpaperFeaturingARetroSty10e6d742D35442a98c19Ca72846339e70_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
APixelArtInspiredWallpaperFeaturingARetroSty10e6d742D35442a98c19Ca72846339e70_0_Image.colorStats =
    hydrateColorStats(colorStats);
APixelArtInspiredWallpaperFeaturingARetroSty10e6d742D35442a98c19Ca72846339e70_0_Image.texts =
    texts satisfies IWallpaperTexts;
