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
import colorStats from './Pavol_Hejn_a_bold_and_graphic_image_of_a_tiger_s_head_for_a_wil_e635bda5-db86-4c53-8d21-8e9c7801bd94-0_2.colors.json';
import metadata from './Pavol_Hejn_a_bold_and_graphic_image_of_a_tiger_s_head_for_a_wil_e635bda5-db86-4c53-8d21-8e9c7801bd94-0_2.json';
import texts from './Pavol_Hejn_a_bold_and_graphic_image_of_a_tiger_s_head_for_a_wil_e635bda5-db86-4c53-8d21-8e9c7801bd94-0_2.texts.json';

/**
 * Image of A bold and graphic image of a tiger's head for a wildlife or animal conservation website
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ABoldAndGraphicImageOfATigerSHeadForAWilE635bda5Db864c538d218e9c7801bd940_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A bold and graphic image of a tiger's head for a wildlife or animal conservation website"
            src="https://cdn.midjourney.com/e635bda5-db86-4c53-8d21-8e9c7801bd94/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ABoldAndGraphicImageOfATigerSHeadForAWilE635bda5Db864c538d218e9c7801bd940_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ABoldAndGraphicImageOfATigerSHeadForAWilE635bda5Db864c538d218e9c7801bd940_2_Image.colorStats =
    hydrateColorStats(colorStats);
ABoldAndGraphicImageOfATigerSHeadForAWilE635bda5Db864c538d218e9c7801bd940_2_Image.texts =
    texts satisfies IWallpaperTexts;
