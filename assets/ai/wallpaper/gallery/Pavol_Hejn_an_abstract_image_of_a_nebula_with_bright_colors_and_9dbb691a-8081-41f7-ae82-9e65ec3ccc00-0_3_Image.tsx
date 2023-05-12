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
import colorStats from './Pavol_Hejn_an_abstract_image_of_a_nebula_with_bright_colors_and_9dbb691a-8081-41f7-ae82-9e65ec3ccc00-0_3.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_a_nebula_with_bright_colors_and_9dbb691a-8081-41f7-ae82-9e65ec3ccc00-0_3.json';
import texts from './Pavol_Hejn_an_abstract_image_of_a_nebula_with_bright_colors_and_9dbb691a-8081-41f7-ae82-9e65ec3ccc00-0_3.texts.json';

/**
 * Image of An abstract image of a nebula, with bright colors and intricate patterns representing the birth of stars.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfANebulaWithBrightColorsAnd9dbb691a808141f7Ae829e65ec3ccc000_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of a nebula, with bright colors and intricate patterns representing the birth of stars."
            src="https://cdn.midjourney.com/9dbb691a-8081-41f7-ae82-9e65ec3ccc00/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfANebulaWithBrightColorsAnd9dbb691a808141f7Ae829e65ec3ccc000_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfANebulaWithBrightColorsAnd9dbb691a808141f7Ae829e65ec3ccc000_3_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfANebulaWithBrightColorsAnd9dbb691a808141f7Ae829e65ec3ccc000_3_Image.texts =
    texts satisfies IWallpaperTexts;
