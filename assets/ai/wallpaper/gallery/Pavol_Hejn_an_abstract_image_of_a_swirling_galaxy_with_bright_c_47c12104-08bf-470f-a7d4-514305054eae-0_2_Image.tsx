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
import colorStats from './Pavol_Hejn_an_abstract_image_of_a_swirling_galaxy_with_bright_c_47c12104-08bf-470f-a7d4-514305054eae-0_2.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_a_swirling_galaxy_with_bright_c_47c12104-08bf-470f-a7d4-514305054eae-0_2.json';
import texts from './Pavol_Hejn_an_abstract_image_of_a_swirling_galaxy_with_bright_c_47c12104-08bf-470f-a7d4-514305054eae-0_2.texts.json';

/**
 * Image of An abstract image of a swirling galaxy, with bright colors and intricate patterns.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfASwirlingGalaxyWithBrightC47c1210408bf470fA7d4514305054eae0_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of a swirling galaxy, with bright colors and intricate patterns."
            src="https://cdn.midjourney.com/47c12104-08bf-470f-a7d4-514305054eae/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfASwirlingGalaxyWithBrightC47c1210408bf470fA7d4514305054eae0_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfASwirlingGalaxyWithBrightC47c1210408bf470fA7d4514305054eae0_2_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfASwirlingGalaxyWithBrightC47c1210408bf470fA7d4514305054eae0_2_Image.texts =
    texts satisfies IWallpaperTexts;
