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
import colorStats from './Pavol_Hejn_an_abstract_image_of_overlapping_circles_in_bright_c_53e402f1-4338-4589-b5ec-98da5b3788c0-0_2.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_overlapping_circles_in_bright_c_53e402f1-4338-4589-b5ec-98da5b3788c0-0_2.json';
import texts from './Pavol_Hejn_an_abstract_image_of_overlapping_circles_in_bright_c_53e402f1-4338-4589-b5ec-98da5b3788c0-0_2.texts.json';

/**
 * Image of An abstract image of overlapping circles in bright colors for a business or marketing website
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfOverlappingCirclesInBrightC53e402f143384589B5ec98da5b3788c00_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of overlapping circles in bright colors for a business or marketing website"
            src="https://cdn.midjourney.com/53e402f1-4338-4589-b5ec-98da5b3788c0/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfOverlappingCirclesInBrightC53e402f143384589B5ec98da5b3788c00_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfOverlappingCirclesInBrightC53e402f143384589B5ec98da5b3788c00_2_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfOverlappingCirclesInBrightC53e402f143384589B5ec98da5b3788c00_2_Image.texts =
    texts satisfies IWallpaperTexts;
