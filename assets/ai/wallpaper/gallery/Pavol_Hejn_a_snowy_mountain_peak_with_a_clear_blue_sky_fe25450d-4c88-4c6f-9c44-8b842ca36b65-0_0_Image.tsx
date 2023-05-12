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
import colorStats from './Pavol_Hejn_a_snowy_mountain_peak_with_a_clear_blue_sky_fe25450d-4c88-4c6f-9c44-8b842ca36b65-0_0.colors.json';
import metadata from './Pavol_Hejn_a_snowy_mountain_peak_with_a_clear_blue_sky_fe25450d-4c88-4c6f-9c44-8b842ca36b65-0_0.json';
import texts from './Pavol_Hejn_a_snowy_mountain_peak_with_a_clear_blue_sky_fe25450d-4c88-4c6f-9c44-8b842ca36b65-0_0.texts.json';

/**
 * Image of A snowy mountain peak with a clear blue sky
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ASnowyMountainPeakWithAClearBlueSkyFe25450d4c884c6f9c448b842ca36b650_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A snowy mountain peak with a clear blue sky"
            src="https://cdn.midjourney.com/fe25450d-4c88-4c6f-9c44-8b842ca36b65/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ASnowyMountainPeakWithAClearBlueSkyFe25450d4c884c6f9c448b842ca36b650_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ASnowyMountainPeakWithAClearBlueSkyFe25450d4c884c6f9c448b842ca36b650_0_Image.colorStats = hydrateColorStats(colorStats);
ASnowyMountainPeakWithAClearBlueSkyFe25450d4c884c6f9c448b842ca36b650_0_Image.texts = texts satisfies IWallpaperTexts;
