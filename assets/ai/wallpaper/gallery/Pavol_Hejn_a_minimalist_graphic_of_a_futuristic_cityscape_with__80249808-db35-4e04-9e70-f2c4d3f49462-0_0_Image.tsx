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
import colorStats from './Pavol_Hejn_a_minimalist_graphic_of_a_futuristic_cityscape_with__80249808-db35-4e04-9e70-f2c4d3f49462-0_0.colors.json';
import metadata from './Pavol_Hejn_a_minimalist_graphic_of_a_futuristic_cityscape_with__80249808-db35-4e04-9e70-f2c4d3f49462-0_0.json';
import texts from './Pavol_Hejn_a_minimalist_graphic_of_a_futuristic_cityscape_with__80249808-db35-4e04-9e70-f2c4d3f49462-0_0.texts.json';

/**
 * Image of A minimalist graphic of a futuristic cityscape, with glowing neon lights and a dark and moody color scheme.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AMinimalistGraphicOfAFuturisticCityscapeWith80249808Db354e049e70F2c4d3f494620_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A minimalist graphic of a futuristic cityscape, with glowing neon lights and a dark and moody color scheme."
            src="https://cdn.midjourney.com/80249808-db35-4e04-9e70-f2c4d3f49462/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AMinimalistGraphicOfAFuturisticCityscapeWith80249808Db354e049e70F2c4d3f494620_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AMinimalistGraphicOfAFuturisticCityscapeWith80249808Db354e049e70F2c4d3f494620_0_Image.colorStats =
    hydrateColorStats(colorStats);
AMinimalistGraphicOfAFuturisticCityscapeWith80249808Db354e049e70F2c4d3f494620_0_Image.texts =
    texts satisfies IWallpaperTexts;
