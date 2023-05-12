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
import colorStats from './Pavol_Hejn_an_abstract_pattern_with_bright_colors_4bdd858a-c789-4652-ab2b-5f31a22a6bd7-0_0.colors.json';
import metadata from './Pavol_Hejn_an_abstract_pattern_with_bright_colors_4bdd858a-c789-4652-ab2b-5f31a22a6bd7-0_0.json';
import texts from './Pavol_Hejn_an_abstract_pattern_with_bright_colors_4bdd858a-c789-4652-ab2b-5f31a22a6bd7-0_0.texts.json';

/**
 * Image of An abstract pattern with bright colors
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AnAbstractPatternWithBrightColors4bdd858aC7894652Ab2b5f31a22a6bd70_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract pattern with bright colors"
            src="https://cdn.midjourney.com/4bdd858a-c789-4652-ab2b-5f31a22a6bd7/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractPatternWithBrightColors4bdd858aC7894652Ab2b5f31a22a6bd70_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractPatternWithBrightColors4bdd858aC7894652Ab2b5f31a22a6bd70_0_Image.colorStats = hydrateColorStats(colorStats);
AnAbstractPatternWithBrightColors4bdd858aC7894652Ab2b5f31a22a6bd70_0_Image.texts = texts satisfies IWallpaperTexts;
