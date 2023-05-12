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
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_cyborg_s_face_5455febb-ab5a-4610-b64f-1f62dda9dcb5-0_3.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_cyborg_s_face_5455febb-ab5a-4610-b64f-1f62dda9dcb5-0_3.json';
import source from 'https://cdn.midjourney.com/5455febb-ab5a-4610-b64f-1f62dda9dcb5/0_3.png';
import texts from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_cyborg_s_face_5455febb-ab5a-4610-b64f-1f62dda9dcb5-0_3.texts.json';

/**
 * Image of A wallpaper with a simple graphic of a cyborg's face, against a background of digital noise and static.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithASimpleGraphicOfACyborgSFace5455febbAb5a4610B64f1f62dda9dcb50_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a simple graphic of a cyborg's face, against a background of digital noise and static."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithASimpleGraphicOfACyborgSFace5455febbAb5a4610B64f1f62dda9dcb50_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithASimpleGraphicOfACyborgSFace5455febbAb5a4610B64f1f62dda9dcb50_3_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithASimpleGraphicOfACyborgSFace5455febbAb5a4610B64f1f62dda9dcb50_3_Image.texts =
    texts satisfies IWallpaperTexts;
