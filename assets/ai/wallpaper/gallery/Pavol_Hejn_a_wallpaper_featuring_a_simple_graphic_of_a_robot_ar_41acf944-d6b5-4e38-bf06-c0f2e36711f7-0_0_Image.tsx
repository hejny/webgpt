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
import colorStats from './Pavol_Hejn_a_wallpaper_featuring_a_simple_graphic_of_a_robot_ar_41acf944-d6b5-4e38-bf06-c0f2e36711f7-0_0.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_featuring_a_simple_graphic_of_a_robot_ar_41acf944-d6b5-4e38-bf06-c0f2e36711f7-0_0.json';
import texts from './Pavol_Hejn_a_wallpaper_featuring_a_simple_graphic_of_a_robot_ar_41acf944-d6b5-4e38-bf06-c0f2e36711f7-0_0.texts.json';

/**
 * Image of A wallpaper featuring a simple graphic of a robot arm holding a smartphone, with a space for placing important notifications or messages.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AWallpaperFeaturingASimpleGraphicOfARobotAr41acf944D6b54e38Bf06C0f2e36711f70_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper featuring a simple graphic of a robot arm holding a smartphone, with a space for placing important notifications or messages."
            src="https://cdn.midjourney.com/41acf944-d6b5-4e38-bf06-c0f2e36711f7/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperFeaturingASimpleGraphicOfARobotAr41acf944D6b54e38Bf06C0f2e36711f70_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperFeaturingASimpleGraphicOfARobotAr41acf944D6b54e38Bf06C0f2e36711f70_0_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperFeaturingASimpleGraphicOfARobotAr41acf944D6b54e38Bf06C0f2e36711f70_0_Image.texts =
    texts satisfies IWallpaperTexts;
