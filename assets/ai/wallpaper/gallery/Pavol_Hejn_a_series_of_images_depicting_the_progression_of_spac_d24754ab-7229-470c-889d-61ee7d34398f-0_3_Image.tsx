/**
 * 🏭 GENERATED WITH 🖼️ Generate wallpapers library
 * ⚠️ Warning: Do not edit by hand, all changes will be lost on next execution!
 *    If you want to edit this file:
 *      - Change @generated to @not-generated
 *      - And remove this warning
 *    Then the file will not be re-generated automatically
 */
import Image from 'next/image';
import { Color } from '../../../../src/utils/color/Color';
import { colorToDataUrl } from '../../../../src/utils/color/utils/colorToDataUrl';
import { hydrateColorStats } from '../../../../src/utils/image/utils/hydrateColorStats';
import { IWallpaperComponentProps, IWallpaperMetadata, IWallpaperTexts } from '../IWallpaperComponent';
import colorStats from './Pavol_Hejn_a_series_of_images_depicting_the_progression_of_spac_d24754ab-7229-470c-889d-61ee7d34398f-0_3.colors.json';
import metadata from './Pavol_Hejn_a_series_of_images_depicting_the_progression_of_spac_d24754ab-7229-470c-889d-61ee7d34398f-0_3.json';
import texts from './Pavol_Hejn_a_series_of_images_depicting_the_progression_of_spac_d24754ab-7229-470c-889d-61ee7d34398f-0_3.texts.json';

/**
 * Image of A series of images depicting the progression of space exploration, from early rockets to modern spacecraft.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ASeriesOfImagesDepictingTheProgressionOfSpacD24754ab7229470c889d61ee7d34398f0_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A series of images depicting the progression of space exploration, from early rockets to modern spacecraft."
            src="https://cdn.midjourney.com/d24754ab-7229-470c-889d-61ee7d34398f/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ASeriesOfImagesDepictingTheProgressionOfSpacD24754ab7229470c889d61ee7d34398f0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ASeriesOfImagesDepictingTheProgressionOfSpacD24754ab7229470c889d61ee7d34398f0_3_Image.colorStats =
    hydrateColorStats(colorStats);
ASeriesOfImagesDepictingTheProgressionOfSpacD24754ab7229470c889d61ee7d34398f0_3_Image.texts =
    texts satisfies IWallpaperTexts;
