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
import colorStats from './Pavol_Hejn_a_bright_and_cheerful_image_of_a_sunflower_field_for_8f592506-f783-430d-bb38-8facb0246c9e-0_3.colors.json';
import metadata from './Pavol_Hejn_a_bright_and_cheerful_image_of_a_sunflower_field_for_8f592506-f783-430d-bb38-8facb0246c9e-0_3.json';
import texts from './Pavol_Hejn_a_bright_and_cheerful_image_of_a_sunflower_field_for_8f592506-f783-430d-bb38-8facb0246c9e-0_3.texts.json';

/**
 * Image of A bright and cheerful image of a sunflower field for a gardening or nature website
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ABrightAndCheerfulImageOfASunflowerFieldFor8f592506F783430dBb388facb0246c9e0_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A bright and cheerful image of a sunflower field for a gardening or nature website"
            src="https://cdn.midjourney.com/8f592506-f783-430d-bb38-8facb0246c9e/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ABrightAndCheerfulImageOfASunflowerFieldFor8f592506F783430dBb388facb0246c9e0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ABrightAndCheerfulImageOfASunflowerFieldFor8f592506F783430dBb388facb0246c9e0_3_Image.colorStats =
    hydrateColorStats(colorStats);
ABrightAndCheerfulImageOfASunflowerFieldFor8f592506F783430dBb388facb0246c9e0_3_Image.texts =
    texts satisfies IWallpaperTexts;
