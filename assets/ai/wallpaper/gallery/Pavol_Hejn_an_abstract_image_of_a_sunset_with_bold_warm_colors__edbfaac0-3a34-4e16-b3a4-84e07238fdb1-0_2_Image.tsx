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
import colorStats from './Pavol_Hejn_an_abstract_image_of_a_sunset_with_bold_warm_colors__edbfaac0-3a34-4e16-b3a4-84e07238fdb1-0_2.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_a_sunset_with_bold_warm_colors__edbfaac0-3a34-4e16-b3a4-84e07238fdb1-0_2.json';
import texts from './Pavol_Hejn_an_abstract_image_of_a_sunset_with_bold_warm_colors__edbfaac0-3a34-4e16-b3a4-84e07238fdb1-0_2.texts.json';

/**
 * Image of An abstract image of a sunset with bold, warm colors for a photography or travel website
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfASunsetWithBoldWarmColorsEdbfaac03a344e16B3a484e07238fdb10_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of a sunset with bold, warm colors for a photography or travel website"
            src="https://cdn.midjourney.com/edbfaac0-3a34-4e16-b3a4-84e07238fdb1/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfASunsetWithBoldWarmColorsEdbfaac03a344e16B3a484e07238fdb10_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfASunsetWithBoldWarmColorsEdbfaac03a344e16B3a484e07238fdb10_2_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfASunsetWithBoldWarmColorsEdbfaac03a344e16B3a484e07238fdb10_2_Image.texts =
    texts satisfies IWallpaperTexts;
