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
import colorStats from './Pavol_Hejn_a_bold_and_graphic_image_of_a_lion_s_head_for_a_wild_dcfa480f-ef2f-4c6d-9602-c6426ffe92a0-0_3.colors.json';
import metadata from './Pavol_Hejn_a_bold_and_graphic_image_of_a_lion_s_head_for_a_wild_dcfa480f-ef2f-4c6d-9602-c6426ffe92a0-0_3.json';
import texts from './Pavol_Hejn_a_bold_and_graphic_image_of_a_lion_s_head_for_a_wild_dcfa480f-ef2f-4c6d-9602-c6426ffe92a0-0_3.texts.json';

/**
 * Image of A bold and graphic image of a lion's head for a wildlife or animal conservation website
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ABoldAndGraphicImageOfALionSHeadForAWildDcfa480fEf2f4c6d9602C6426ffe92a00_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A bold and graphic image of a lion's head for a wildlife or animal conservation website"
            src="https://cdn.midjourney.com/dcfa480f-ef2f-4c6d-9602-c6426ffe92a0/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ABoldAndGraphicImageOfALionSHeadForAWildDcfa480fEf2f4c6d9602C6426ffe92a00_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ABoldAndGraphicImageOfALionSHeadForAWildDcfa480fEf2f4c6d9602C6426ffe92a00_3_Image.colorStats =
    hydrateColorStats(colorStats);
ABoldAndGraphicImageOfALionSHeadForAWildDcfa480fEf2f4c6d9602C6426ffe92a00_3_Image.texts =
    texts satisfies IWallpaperTexts;
