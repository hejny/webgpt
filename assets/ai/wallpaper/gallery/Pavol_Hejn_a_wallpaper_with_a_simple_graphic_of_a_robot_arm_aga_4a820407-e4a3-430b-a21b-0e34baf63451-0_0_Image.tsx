/**
 * 🏭 GENERATED WITH 🖼️ Generate wallpapers library
 * ⚠️ Warning: Do not edit by hand, all changes will be lost on next execution!
 *    If you want to edit this file:
 *      - Change @generated to @not-generated
 *      - And remove this warning
 *    Then the file will not be re-generated automatically
 */

import Image from 'next/image';
import { hydrateColorStats } from '../../../../src/utils/image/utils/hydrateColorStats';
import { IWallpaperMetadata, IWallpaperTexts, IWallpaperComponentProps } from '../IWallpaperComponent';
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_robot_arm_aga_4a820407-e4a3-430b-a21b-0e34baf63451-0_0.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_robot_arm_aga_4a820407-e4a3-430b-a21b-0e34baf63451-0_0.json';
import source from 'https://cdn.midjourney.com/4a820407-e4a3-430b-a21b-0e34baf63451/0_0.png';
import texts from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_robot_arm_aga_4a820407-e4a3-430b-a21b-0e34baf63451-0_0.texts.json';

/**
 * Image of A wallpaper with a simple graphic of a robot arm, against a gradient background of two complementary colors.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithASimpleGraphicOfARobotArmAga4a820407E4a3430bA21b0e34baf634510_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a simple graphic of a robot arm, against a gradient background of two complementary colors."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithASimpleGraphicOfARobotArmAga4a820407E4a3430bA21b0e34baf634510_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithASimpleGraphicOfARobotArmAga4a820407E4a3430bA21b0e34baf634510_0_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithASimpleGraphicOfARobotArmAga4a820407E4a3430bA21b0e34baf634510_0_Image.texts =
    texts satisfies IWallpaperTexts;
