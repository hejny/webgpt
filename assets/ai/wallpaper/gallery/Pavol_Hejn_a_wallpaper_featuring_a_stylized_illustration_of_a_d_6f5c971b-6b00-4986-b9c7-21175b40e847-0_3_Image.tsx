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
import colorStats from './Pavol_Hejn_a_wallpaper_featuring_a_stylized_illustration_of_a_d_6f5c971b-6b00-4986-b9c7-21175b40e847-0_3.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_featuring_a_stylized_illustration_of_a_d_6f5c971b-6b00-4986-b9c7-21175b40e847-0_3.json';
import source from 'https://cdn.midjourney.com/6f5c971b-6b00-4986-b9c7-21175b40e847/0_3.png';
import texts from './Pavol_Hejn_a_wallpaper_featuring_a_stylized_illustration_of_a_d_6f5c971b-6b00-4986-b9c7-21175b40e847-0_3.texts.json';

/**
 * Image of A wallpaper featuring a stylized illustration of a dystopian future, with metallic textures and digital glitch effects.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AWallpaperFeaturingAStylizedIllustrationOfAD6f5c971b6b004986B9c721175b40e8470_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper featuring a stylized illustration of a dystopian future, with metallic textures and digital glitch effects."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperFeaturingAStylizedIllustrationOfAD6f5c971b6b004986B9c721175b40e8470_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperFeaturingAStylizedIllustrationOfAD6f5c971b6b004986B9c721175b40e8470_3_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperFeaturingAStylizedIllustrationOfAD6f5c971b6b004986B9c721175b40e8470_3_Image.texts =
    texts satisfies IWallpaperTexts;
