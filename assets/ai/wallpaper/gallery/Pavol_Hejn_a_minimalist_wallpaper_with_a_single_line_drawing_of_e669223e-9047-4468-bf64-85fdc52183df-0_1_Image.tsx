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
import colorStats from './Pavol_Hejn_a_minimalist_wallpaper_with_a_single_line_drawing_of_e669223e-9047-4468-bf64-85fdc52183df-0_1.colors.json';
import metadata from './Pavol_Hejn_a_minimalist_wallpaper_with_a_single_line_drawing_of_e669223e-9047-4468-bf64-85fdc52183df-0_1.json';
import source from 'https://cdn.midjourney.com/e669223e-9047-4468-bf64-85fdc52183df/0_1.png';
import texts from './Pavol_Hejn_a_minimalist_wallpaper_with_a_single_line_drawing_of_e669223e-9047-4468-bf64-85fdc52183df-0_1.texts.json';

/**
 * Image of A minimalist wallpaper with a single line drawing of a cyborg, in a striking color such as bright red or blue.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AMinimalistWallpaperWithASingleLineDrawingOfE669223e90474468Bf6485fdc52183df0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A minimalist wallpaper with a single line drawing of a cyborg, in a striking color such as bright red or blue."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AMinimalistWallpaperWithASingleLineDrawingOfE669223e90474468Bf6485fdc52183df0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AMinimalistWallpaperWithASingleLineDrawingOfE669223e90474468Bf6485fdc52183df0_1_Image.colorStats =
    hydrateColorStats(colorStats);
AMinimalistWallpaperWithASingleLineDrawingOfE669223e90474468Bf6485fdc52183df0_1_Image.texts =
    texts satisfies IWallpaperTexts;
