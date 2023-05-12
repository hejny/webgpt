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
import colorStats from './Pavol_Hejn_a_realistic_photograph_of_a_nebula_with_bright_color_cd56b4f2-4379-4d40-9c2c-e202df99d809-0_2.colors.json';
import metadata from './Pavol_Hejn_a_realistic_photograph_of_a_nebula_with_bright_color_cd56b4f2-4379-4d40-9c2c-e202df99d809-0_2.json';
import source from 'https://cdn.midjourney.com/cd56b4f2-4379-4d40-9c2c-e202df99d809/0_2.png';
import texts from './Pavol_Hejn_a_realistic_photograph_of_a_nebula_with_bright_color_cd56b4f2-4379-4d40-9c2c-e202df99d809-0_2.texts.json';

/**
 * Image of A realistic photograph of a nebula, with bright colors and intricate details that showcase the beauty of the universe.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ARealisticPhotographOfANebulaWithBrightColorCd56b4f243794d409c2cE202df99d8090_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A realistic photograph of a nebula, with bright colors and intricate details that showcase the beauty of the universe."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ARealisticPhotographOfANebulaWithBrightColorCd56b4f243794d409c2cE202df99d8090_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ARealisticPhotographOfANebulaWithBrightColorCd56b4f243794d409c2cE202df99d8090_2_Image.colorStats =
    hydrateColorStats(colorStats);
ARealisticPhotographOfANebulaWithBrightColorCd56b4f243794d409c2cE202df99d8090_2_Image.texts =
    texts satisfies IWallpaperTexts;
