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
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_simple_illustration_of_a_virtual__24fc60cc-91fa-4424-8421-d32c4e0b6758-0_0.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_simple_illustration_of_a_virtual__24fc60cc-91fa-4424-8421-d32c4e0b6758-0_0.json';
import source from 'https://cdn.midjourney.com/24fc60cc-91fa-4424-8421-d32c4e0b6758/0_0.png';
import texts from './Pavol_Hejn_a_wallpaper_with_a_simple_illustration_of_a_virtual__24fc60cc-91fa-4424-8421-d32c4e0b6758-0_0.texts.json';

/**
 * Image of A wallpaper with a simple illustration of a virtual reality headset, against a gradient background of two contrasting colors.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithASimpleIllustrationOfAVirtual24fc60cc91fa44248421D32c4e0b67580_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a simple illustration of a virtual reality headset, against a gradient background of two contrasting colors."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithASimpleIllustrationOfAVirtual24fc60cc91fa44248421D32c4e0b67580_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithASimpleIllustrationOfAVirtual24fc60cc91fa44248421D32c4e0b67580_0_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithASimpleIllustrationOfAVirtual24fc60cc91fa44248421D32c4e0b67580_0_Image.texts =
    texts satisfies IWallpaperTexts;
