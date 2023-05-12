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
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_single_line_drawing_of_a_drone_ag_e2c1b087-cde7-4246-8398-023dd8837d6b-0_1.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_single_line_drawing_of_a_drone_ag_e2c1b087-cde7-4246-8398-023dd8837d6b-0_1.json';
import source from 'https://cdn.midjourney.com/e2c1b087-cde7-4246-8398-023dd8837d6b/0_1.png';
import texts from './Pavol_Hejn_a_wallpaper_with_a_single_line_drawing_of_a_drone_ag_e2c1b087-cde7-4246-8398-023dd8837d6b-0_1.texts.json';

/**
 * Image of A wallpaper with a single line drawing of a drone, against a background of geometric shapes in complementary colors.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithASingleLineDrawingOfADroneAgE2c1b087Cde742468398023dd8837d6b0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a single line drawing of a drone, against a background of geometric shapes in complementary colors."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithASingleLineDrawingOfADroneAgE2c1b087Cde742468398023dd8837d6b0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithASingleLineDrawingOfADroneAgE2c1b087Cde742468398023dd8837d6b0_1_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithASingleLineDrawingOfADroneAgE2c1b087Cde742468398023dd8837d6b0_1_Image.texts =
    texts satisfies IWallpaperTexts;
