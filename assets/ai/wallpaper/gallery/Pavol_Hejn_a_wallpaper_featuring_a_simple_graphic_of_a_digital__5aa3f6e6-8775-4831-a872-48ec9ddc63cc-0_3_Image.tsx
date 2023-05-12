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
import colorStats from './Pavol_Hejn_a_wallpaper_featuring_a_simple_graphic_of_a_digital__5aa3f6e6-8775-4831-a872-48ec9ddc63cc-0_3.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_featuring_a_simple_graphic_of_a_digital__5aa3f6e6-8775-4831-a872-48ec9ddc63cc-0_3.json';
import texts from './Pavol_Hejn_a_wallpaper_featuring_a_simple_graphic_of_a_digital__5aa3f6e6-8775-4831-a872-48ec9ddc63cc-0_3.texts.json';

/**
 * Image of A wallpaper featuring a simple graphic of a digital clock or timer, with space for setting alarms and countdowns.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AWallpaperFeaturingASimpleGraphicOfADigital5aa3f6e687754831A87248ec9ddc63cc0_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper featuring a simple graphic of a digital clock or timer, with space for setting alarms and countdowns."
            src="https://cdn.midjourney.com/5aa3f6e6-8775-4831-a872-48ec9ddc63cc/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperFeaturingASimpleGraphicOfADigital5aa3f6e687754831A87248ec9ddc63cc0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperFeaturingASimpleGraphicOfADigital5aa3f6e687754831A87248ec9ddc63cc0_3_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperFeaturingASimpleGraphicOfADigital5aa3f6e687754831A87248ec9ddc63cc0_3_Image.texts =
    texts satisfies IWallpaperTexts;
