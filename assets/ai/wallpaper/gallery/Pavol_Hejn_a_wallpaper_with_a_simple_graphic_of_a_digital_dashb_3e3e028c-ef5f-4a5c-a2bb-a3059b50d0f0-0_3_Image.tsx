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
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_digital_dashb_3e3e028c-ef5f-4a5c-a2bb-a3059b50d0f0-0_3.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_digital_dashb_3e3e028c-ef5f-4a5c-a2bb-a3059b50d0f0-0_3.json';
import texts from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_digital_dashb_3e3e028c-ef5f-4a5c-a2bb-a3059b50d0f0-0_3.texts.json';

/**
 * Image of A wallpaper with a simple graphic of a digital dashboard or control panel, with space for monitoring and managing data.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithASimpleGraphicOfADigitalDashbe3e028cEf5f4a5cA2bbA3059b50d0f003_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a simple graphic of a digital dashboard or control panel, with space for monitoring and managing data."
            src="https://cdn.midjourney.com/3e3e028c-ef5f-4a5c-a2bb-a3059b50d0f0/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithASimpleGraphicOfADigitalDashbe3e028cEf5f4a5cA2bbA3059b50d0f003_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithASimpleGraphicOfADigitalDashbe3e028cEf5f4a5cA2bbA3059b50d0f003_3_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithASimpleGraphicOfADigitalDashbe3e028cEf5f4a5cA2bbA3059b50d0f003_3_Image.texts =
    texts satisfies IWallpaperTexts;
