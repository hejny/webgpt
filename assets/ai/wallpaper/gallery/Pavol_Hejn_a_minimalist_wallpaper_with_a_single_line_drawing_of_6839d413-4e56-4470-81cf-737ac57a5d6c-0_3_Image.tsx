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
import colorStats from './Pavol_Hejn_a_minimalist_wallpaper_with_a_single_line_drawing_of_6839d413-4e56-4470-81cf-737ac57a5d6c-0_3.colors.json';
import metadata from './Pavol_Hejn_a_minimalist_wallpaper_with_a_single_line_drawing_of_6839d413-4e56-4470-81cf-737ac57a5d6c-0_3.json';
import texts from './Pavol_Hejn_a_minimalist_wallpaper_with_a_single_line_drawing_of_6839d413-4e56-4470-81cf-737ac57a5d6c-0_3.texts.json';

/**
 * Image of A minimalist wallpaper with a single line drawing of a cyborg, in a striking color such as bright red or blue.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AMinimalistWallpaperWithASingleLineDrawingOf6839d4134e56447081cf737ac57a5d6c0_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A minimalist wallpaper with a single line drawing of a cyborg, in a striking color such as bright red or blue."
            src="https://cdn.midjourney.com/6839d413-4e56-4470-81cf-737ac57a5d6c/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AMinimalistWallpaperWithASingleLineDrawingOf6839d4134e56447081cf737ac57a5d6c0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AMinimalistWallpaperWithASingleLineDrawingOf6839d4134e56447081cf737ac57a5d6c0_3_Image.colorStats =
    hydrateColorStats(colorStats);
AMinimalistWallpaperWithASingleLineDrawingOf6839d4134e56447081cf737ac57a5d6c0_3_Image.texts =
    texts satisfies IWallpaperTexts;
