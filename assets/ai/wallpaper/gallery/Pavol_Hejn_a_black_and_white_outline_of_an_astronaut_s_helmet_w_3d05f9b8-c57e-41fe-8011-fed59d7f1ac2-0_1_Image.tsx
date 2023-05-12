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
import colorStats from './Pavol_Hejn_a_black_and_white_outline_of_an_astronaut_s_helmet_w_3d05f9b8-c57e-41fe-8011-fed59d7f1ac2-0_1.colors.json';
import metadata from './Pavol_Hejn_a_black_and_white_outline_of_an_astronaut_s_helmet_w_3d05f9b8-c57e-41fe-8011-fed59d7f1ac2-0_1.json';
import texts from './Pavol_Hejn_a_black_and_white_outline_of_an_astronaut_s_helmet_w_3d05f9b8-c57e-41fe-8011-fed59d7f1ac2-0_1.texts.json';

/**
 * Image of A black and white outline of an astronaut's helmet, with intricate details that showcase the reflection of the surrounding environment.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ABlackAndWhiteOutlineOfAnAstronautSHelmetW3d05f9b8C57e41fe8011Fed59d7f1ac20_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A black and white outline of an astronaut's helmet, with intricate details that showcase the reflection of the surrounding environment."
            src="https://cdn.midjourney.com/3d05f9b8-c57e-41fe-8011-fed59d7f1ac2/0_1.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ABlackAndWhiteOutlineOfAnAstronautSHelmetW3d05f9b8C57e41fe8011Fed59d7f1ac20_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ABlackAndWhiteOutlineOfAnAstronautSHelmetW3d05f9b8C57e41fe8011Fed59d7f1ac20_1_Image.colorStats =
    hydrateColorStats(colorStats);
ABlackAndWhiteOutlineOfAnAstronautSHelmetW3d05f9b8C57e41fe8011Fed59d7f1ac20_1_Image.texts =
    texts satisfies IWallpaperTexts;
