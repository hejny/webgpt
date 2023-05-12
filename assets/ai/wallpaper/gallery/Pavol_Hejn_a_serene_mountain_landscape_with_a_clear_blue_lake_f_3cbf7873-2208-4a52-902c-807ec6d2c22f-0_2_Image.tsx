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
import colorStats from './Pavol_Hejn_a_serene_mountain_landscape_with_a_clear_blue_lake_f_3cbf7873-2208-4a52-902c-807ec6d2c22f-0_2.colors.json';
import metadata from './Pavol_Hejn_a_serene_mountain_landscape_with_a_clear_blue_lake_f_3cbf7873-2208-4a52-902c-807ec6d2c22f-0_2.json';
import source from 'https://cdn.midjourney.com/3cbf7873-2208-4a52-902c-807ec6d2c22f/0_2.png';
import texts from './Pavol_Hejn_a_serene_mountain_landscape_with_a_clear_blue_lake_f_3cbf7873-2208-4a52-902c-807ec6d2c22f-0_2.texts.json';

/**
 * Image of A serene mountain landscape with a clear blue lake for a meditation or wellness website
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ASereneMountainLandscapeWithAClearBlueLakeF3cbf787322084a52902c807ec6d2c22f0_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A serene mountain landscape with a clear blue lake for a meditation or wellness website"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ASereneMountainLandscapeWithAClearBlueLakeF3cbf787322084a52902c807ec6d2c22f0_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ASereneMountainLandscapeWithAClearBlueLakeF3cbf787322084a52902c807ec6d2c22f0_2_Image.colorStats =
    hydrateColorStats(colorStats);
ASereneMountainLandscapeWithAClearBlueLakeF3cbf787322084a52902c807ec6d2c22f0_2_Image.texts =
    texts satisfies IWallpaperTexts;
