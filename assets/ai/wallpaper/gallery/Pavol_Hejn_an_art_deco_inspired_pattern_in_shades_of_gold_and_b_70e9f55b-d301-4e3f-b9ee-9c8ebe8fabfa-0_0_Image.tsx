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
import colorStats from './Pavol_Hejn_an_art_deco_inspired_pattern_in_shades_of_gold_and_b_70e9f55b-d301-4e3f-b9ee-9c8ebe8fabfa-0_0.colors.json';
import metadata from './Pavol_Hejn_an_art_deco_inspired_pattern_in_shades_of_gold_and_b_70e9f55b-d301-4e3f-b9ee-9c8ebe8fabfa-0_0.json';
import texts from './Pavol_Hejn_an_art_deco_inspired_pattern_in_shades_of_gold_and_b_70e9f55b-d301-4e3f-b9ee-9c8ebe8fabfa-0_0.texts.json';

/**
 * Image of An Art Deco-inspired pattern in shades of gold and black, with futuristic elements such as robot arms and AI nodes.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AnArtDecoInspiredPatternInShadesOfGoldAndB70e9f55bD3014e3fB9ee9c8ebe8fabfa0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An Art Deco-inspired pattern in shades of gold and black, with futuristic elements such as robot arms and AI nodes."
            src="https://cdn.midjourney.com/70e9f55b-d301-4e3f-b9ee-9c8ebe8fabfa/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnArtDecoInspiredPatternInShadesOfGoldAndB70e9f55bD3014e3fB9ee9c8ebe8fabfa0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnArtDecoInspiredPatternInShadesOfGoldAndB70e9f55bD3014e3fB9ee9c8ebe8fabfa0_0_Image.colorStats =
    hydrateColorStats(colorStats);
AnArtDecoInspiredPatternInShadesOfGoldAndB70e9f55bD3014e3fB9ee9c8ebe8fabfa0_0_Image.texts =
    texts satisfies IWallpaperTexts;
