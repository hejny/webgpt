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
import colorStats from './Pavol_Hejn_a_waterfall_in_the_forest_87406e5f-5ccf-4c1e-a10a-67d2ee3b526b-0_3.colors.json';
import metadata from './Pavol_Hejn_a_waterfall_in_the_forest_87406e5f-5ccf-4c1e-a10a-67d2ee3b526b-0_3.json';
import texts from './Pavol_Hejn_a_waterfall_in_the_forest_87406e5f-5ccf-4c1e-a10a-67d2ee3b526b-0_3.texts.json';

/**
 * Image of A waterfall in the forest
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AWaterfallInTheForest87406e5f5ccf4c1eA10a67d2ee3b526b0_3_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A waterfall in the forest"
            src="https://cdn.midjourney.com/87406e5f-5ccf-4c1e-a10a-67d2ee3b526b/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWaterfallInTheForest87406e5f5ccf4c1eA10a67d2ee3b526b0_3_Image.metadata = metadata satisfies IWallpaperMetadata;
AWaterfallInTheForest87406e5f5ccf4c1eA10a67d2ee3b526b0_3_Image.colorStats = hydrateColorStats(colorStats);
AWaterfallInTheForest87406e5f5ccf4c1eA10a67d2ee3b526b0_3_Image.texts = texts satisfies IWallpaperTexts;
