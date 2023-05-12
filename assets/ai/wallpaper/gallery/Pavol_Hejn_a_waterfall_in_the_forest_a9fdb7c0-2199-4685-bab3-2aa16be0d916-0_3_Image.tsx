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
import colorStats from './Pavol_Hejn_a_waterfall_in_the_forest_a9fdb7c0-2199-4685-bab3-2aa16be0d916-0_3.colors.json';
import metadata from './Pavol_Hejn_a_waterfall_in_the_forest_a9fdb7c0-2199-4685-bab3-2aa16be0d916-0_3.json';
import source from 'https://cdn.midjourney.com/a9fdb7c0-2199-4685-bab3-2aa16be0d916/0_3.png';
import texts from './Pavol_Hejn_a_waterfall_in_the_forest_a9fdb7c0-2199-4685-bab3-2aa16be0d916-0_3.texts.json';

/**
 * Image of A waterfall in the forest
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AWaterfallInTheForestA9fdb7c021994685Bab32aa16be0d9160_3_Image(props: IWallpaperComponentProps) {
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

AWaterfallInTheForestA9fdb7c021994685Bab32aa16be0d9160_3_Image.metadata = metadata satisfies IWallpaperMetadata;
AWaterfallInTheForestA9fdb7c021994685Bab32aa16be0d9160_3_Image.colorStats = hydrateColorStats(colorStats);
AWaterfallInTheForestA9fdb7c021994685Bab32aa16be0d9160_3_Image.texts = texts satisfies IWallpaperTexts;
