/**
 * 🏭 GENERATED WITH 🖼️ Generate wallpapers library
 * ⚠️ Warning: Do not edit by hand, all changes will be lost on next execution!
 *    If you want to edit this file:
 *      - Change @generated to @not-generated
 *      - And remove this warning
 *    Then the file will not be re-generated automatically
 */

import Image from 'next/image';
import { hydrateColorStats } from '../../../../src/utils/image/utils/hydrateColorStats';
import { IWallpaperMetadata, IWallpaperTexts, IWallpaperComponentProps } from '../IWallpaperComponent';
import colorStats from './Pavol_Hejn_a_waterfall_in_the_forest_87406e5f-5ccf-4c1e-a10a-67d2ee3b526b-0_0.colors.json';
import metadata from './Pavol_Hejn_a_waterfall_in_the_forest_87406e5f-5ccf-4c1e-a10a-67d2ee3b526b-0_0.json';
import source from 'https://cdn.midjourney.com/87406e5f-5ccf-4c1e-a10a-67d2ee3b526b/0_0.png';
import texts from './Pavol_Hejn_a_waterfall_in_the_forest_87406e5f-5ccf-4c1e-a10a-67d2ee3b526b-0_0.texts.json';

/**
 * Image of A waterfall in the forest
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AWaterfallInTheForest87406e5f5ccf4c1eA10a67d2ee3b526b0_0_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A waterfall in the forest"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWaterfallInTheForest87406e5f5ccf4c1eA10a67d2ee3b526b0_0_Image.metadata = metadata satisfies IWallpaperMetadata;
AWaterfallInTheForest87406e5f5ccf4c1eA10a67d2ee3b526b0_0_Image.colorStats = hydrateColorStats(colorStats);
AWaterfallInTheForest87406e5f5ccf4c1eA10a67d2ee3b526b0_0_Image.texts = texts satisfies IWallpaperTexts;
