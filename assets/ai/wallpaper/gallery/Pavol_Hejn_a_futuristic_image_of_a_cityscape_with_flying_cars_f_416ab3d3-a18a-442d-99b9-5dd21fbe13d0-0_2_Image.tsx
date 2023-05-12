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
import colorStats from './Pavol_Hejn_a_futuristic_image_of_a_cityscape_with_flying_cars_f_416ab3d3-a18a-442d-99b9-5dd21fbe13d0-0_2.colors.json';
import metadata from './Pavol_Hejn_a_futuristic_image_of_a_cityscape_with_flying_cars_f_416ab3d3-a18a-442d-99b9-5dd21fbe13d0-0_2.json';
import source from 'https://cdn.midjourney.com/416ab3d3-a18a-442d-99b9-5dd21fbe13d0/0_2.png';
import texts from './Pavol_Hejn_a_futuristic_image_of_a_cityscape_with_flying_cars_f_416ab3d3-a18a-442d-99b9-5dd21fbe13d0-0_2.texts.json';

/**
 * Image of A futuristic image of a cityscape with flying cars for a sci-fi or technology website
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AFuturisticImageOfACityscapeWithFlyingCarsF416ab3d3A18a442d99b95dd21fbe13d00_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A futuristic image of a cityscape with flying cars for a sci-fi or technology website"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AFuturisticImageOfACityscapeWithFlyingCarsF416ab3d3A18a442d99b95dd21fbe13d00_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AFuturisticImageOfACityscapeWithFlyingCarsF416ab3d3A18a442d99b95dd21fbe13d00_2_Image.colorStats =
    hydrateColorStats(colorStats);
AFuturisticImageOfACityscapeWithFlyingCarsF416ab3d3A18a442d99b95dd21fbe13d00_2_Image.texts =
    texts satisfies IWallpaperTexts;
