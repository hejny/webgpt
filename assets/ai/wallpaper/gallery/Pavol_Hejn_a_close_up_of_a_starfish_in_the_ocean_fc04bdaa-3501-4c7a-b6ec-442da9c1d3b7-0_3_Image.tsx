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
import colorStats from './Pavol_Hejn_a_close_up_of_a_starfish_in_the_ocean_fc04bdaa-3501-4c7a-b6ec-442da9c1d3b7-0_3.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_a_starfish_in_the_ocean_fc04bdaa-3501-4c7a-b6ec-442da9c1d3b7-0_3.json';
import source from 'https://cdn.midjourney.com/fc04bdaa-3501-4c7a-b6ec-442da9c1d3b7/0_3.png';
import texts from './Pavol_Hejn_a_close_up_of_a_starfish_in_the_ocean_fc04bdaa-3501-4c7a-b6ec-442da9c1d3b7-0_3.texts.json';

/**
 * Image of A close-up of a starfish in the ocean
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfAStarfishInTheOceanFc04bdaa35014c7aB6ec442da9c1d3b70_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up of a starfish in the ocean"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpOfAStarfishInTheOceanFc04bdaa35014c7aB6ec442da9c1d3b70_3_Image.metadata = metadata satisfies IWallpaperMetadata;
ACloseUpOfAStarfishInTheOceanFc04bdaa35014c7aB6ec442da9c1d3b70_3_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfAStarfishInTheOceanFc04bdaa35014c7aB6ec442da9c1d3b70_3_Image.texts = texts satisfies IWallpaperTexts;
