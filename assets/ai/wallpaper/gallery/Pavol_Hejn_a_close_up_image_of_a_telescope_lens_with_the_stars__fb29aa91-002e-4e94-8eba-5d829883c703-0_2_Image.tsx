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
import colorStats from './Pavol_Hejn_a_close_up_image_of_a_telescope_lens_with_the_stars__fb29aa91-002e-4e94-8eba-5d829883c703-0_2.colors.json';
import metadata from './Pavol_Hejn_a_close_up_image_of_a_telescope_lens_with_the_stars__fb29aa91-002e-4e94-8eba-5d829883c703-0_2.json';
import texts from './Pavol_Hejn_a_close_up_image_of_a_telescope_lens_with_the_stars__fb29aa91-002e-4e94-8eba-5d829883c703-0_2.texts.json';

/**
 * Image of A close-up image of a telescope lens, with the stars and planets visible in the reflection.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ACloseUpImageOfATelescopeLensWithTheStarsFb29aa91002e4e948eba5d829883c7030_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up image of a telescope lens, with the stars and planets visible in the reflection."
            src="https://cdn.midjourney.com/fb29aa91-002e-4e94-8eba-5d829883c703/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpImageOfATelescopeLensWithTheStarsFb29aa91002e4e948eba5d829883c7030_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ACloseUpImageOfATelescopeLensWithTheStarsFb29aa91002e4e948eba5d829883c7030_2_Image.colorStats =
    hydrateColorStats(colorStats);
ACloseUpImageOfATelescopeLensWithTheStarsFb29aa91002e4e948eba5d829883c7030_2_Image.texts =
    texts satisfies IWallpaperTexts;
