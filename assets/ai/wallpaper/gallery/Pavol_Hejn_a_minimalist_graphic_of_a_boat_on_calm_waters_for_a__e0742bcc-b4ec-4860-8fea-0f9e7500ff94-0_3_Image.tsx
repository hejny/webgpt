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
import colorStats from './Pavol_Hejn_a_minimalist_graphic_of_a_boat_on_calm_waters_for_a__e0742bcc-b4ec-4860-8fea-0f9e7500ff94-0_3.colors.json';
import metadata from './Pavol_Hejn_a_minimalist_graphic_of_a_boat_on_calm_waters_for_a__e0742bcc-b4ec-4860-8fea-0f9e7500ff94-0_3.json';
import texts from './Pavol_Hejn_a_minimalist_graphic_of_a_boat_on_calm_waters_for_a__e0742bcc-b4ec-4860-8fea-0f9e7500ff94-0_3.texts.json';

/**
 * Image of A minimalist graphic of a boat on calm waters for a boating or water sports website
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AMinimalistGraphicOfABoatOnCalmWatersForAE0742bccB4ec48608fea0f9e7500ff940_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A minimalist graphic of a boat on calm waters for a boating or water sports website"
            src="https://cdn.midjourney.com/e0742bcc-b4ec-4860-8fea-0f9e7500ff94/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AMinimalistGraphicOfABoatOnCalmWatersForAE0742bccB4ec48608fea0f9e7500ff940_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AMinimalistGraphicOfABoatOnCalmWatersForAE0742bccB4ec48608fea0f9e7500ff940_3_Image.colorStats =
    hydrateColorStats(colorStats);
AMinimalistGraphicOfABoatOnCalmWatersForAE0742bccB4ec48608fea0f9e7500ff940_3_Image.texts =
    texts satisfies IWallpaperTexts;
