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
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_neural_networ_f36fd663-9128-4133-8703-91d8d1737baf-0_2.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_neural_networ_f36fd663-9128-4133-8703-91d8d1737baf-0_2.json';
import texts from './Pavol_Hejn_a_wallpaper_with_a_simple_graphic_of_a_neural_networ_f36fd663-9128-4133-8703-91d8d1737baf-0_2.texts.json';

/**
 * Image of A wallpaper with a simple graphic of a neural network, against a background of complementary colors.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithASimpleGraphicOfANeuralNetworF36fd66391284133870391d8d1737baf0_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a simple graphic of a neural network, against a background of complementary colors."
            src="https://cdn.midjourney.com/f36fd663-9128-4133-8703-91d8d1737baf/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithASimpleGraphicOfANeuralNetworF36fd66391284133870391d8d1737baf0_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithASimpleGraphicOfANeuralNetworF36fd66391284133870391d8d1737baf0_2_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithASimpleGraphicOfANeuralNetworF36fd66391284133870391d8d1737baf0_2_Image.texts =
    texts satisfies IWallpaperTexts;
