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
import colorStats from './Pavol_Hejn_a_realistic_photograph_of_a_nebula_with_bright_color_07dcf4e5-48b2-412c-871f-5180ca956453-0_0.colors.json';
import metadata from './Pavol_Hejn_a_realistic_photograph_of_a_nebula_with_bright_color_07dcf4e5-48b2-412c-871f-5180ca956453-0_0.json';
import texts from './Pavol_Hejn_a_realistic_photograph_of_a_nebula_with_bright_color_07dcf4e5-48b2-412c-871f-5180ca956453-0_0.texts.json';

/**
 * Image of A realistic photograph of a nebula, with bright colors and intricate details that showcase the beauty of the universe.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ARealisticPhotographOfANebulaWithBrightColor7dcf4e548b2412c871f5180ca95645300_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A realistic photograph of a nebula, with bright colors and intricate details that showcase the beauty of the universe."
            src="https://cdn.midjourney.com/07dcf4e5-48b2-412c-871f-5180ca956453/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ARealisticPhotographOfANebulaWithBrightColor7dcf4e548b2412c871f5180ca95645300_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ARealisticPhotographOfANebulaWithBrightColor7dcf4e548b2412c871f5180ca95645300_0_Image.colorStats =
    hydrateColorStats(colorStats);
ARealisticPhotographOfANebulaWithBrightColor7dcf4e548b2412c871f5180ca95645300_0_Image.texts =
    texts satisfies IWallpaperTexts;
