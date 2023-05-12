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
import colorStats from './Pavol_Hejn_an_aurora_borealis_over_snow_covered_mountains_c69291e5-d766-4ed3-9072-179c779dd1d6-0_0.colors.json';
import metadata from './Pavol_Hejn_an_aurora_borealis_over_snow_covered_mountains_c69291e5-d766-4ed3-9072-179c779dd1d6-0_0.json';
import source from 'https://cdn.midjourney.com/c69291e5-d766-4ed3-9072-179c779dd1d6/0_0.png';
import texts from './Pavol_Hejn_an_aurora_borealis_over_snow_covered_mountains_c69291e5-d766-4ed3-9072-179c779dd1d6-0_0.texts.json';

/**
 * Image of An aurora borealis over snow-covered mountains
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AnAuroraBorealisOverSnowCoveredMountainsC69291e5D7664ed39072179c779dd1d60_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An aurora borealis over snow-covered mountains"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAuroraBorealisOverSnowCoveredMountainsC69291e5D7664ed39072179c779dd1d60_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAuroraBorealisOverSnowCoveredMountainsC69291e5D7664ed39072179c779dd1d60_0_Image.colorStats =
    hydrateColorStats(colorStats);
AnAuroraBorealisOverSnowCoveredMountainsC69291e5D7664ed39072179c779dd1d60_0_Image.texts =
    texts satisfies IWallpaperTexts;
