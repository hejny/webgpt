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
import colorStats from './Pavol_Hejn_a_colorful_mandala_pattern_for_a_yoga_or_meditation__a27f8c11-9126-409a-a7ca-afd80ea834a2-0_0.colors.json';
import metadata from './Pavol_Hejn_a_colorful_mandala_pattern_for_a_yoga_or_meditation__a27f8c11-9126-409a-a7ca-afd80ea834a2-0_0.json';
import texts from './Pavol_Hejn_a_colorful_mandala_pattern_for_a_yoga_or_meditation__a27f8c11-9126-409a-a7ca-afd80ea834a2-0_0.texts.json';

/**
 * Image of A colorful mandala pattern for a yoga or meditation website
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AColorfulMandalaPatternForAYogaOrMeditationA27f8c119126409aA7caAfd80ea834a20_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A colorful mandala pattern for a yoga or meditation website"
            src="https://cdn.midjourney.com/a27f8c11-9126-409a-a7ca-afd80ea834a2/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AColorfulMandalaPatternForAYogaOrMeditationA27f8c119126409aA7caAfd80ea834a20_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AColorfulMandalaPatternForAYogaOrMeditationA27f8c119126409aA7caAfd80ea834a20_0_Image.colorStats =
    hydrateColorStats(colorStats);
AColorfulMandalaPatternForAYogaOrMeditationA27f8c119126409aA7caAfd80ea834a20_0_Image.texts =
    texts satisfies IWallpaperTexts;
