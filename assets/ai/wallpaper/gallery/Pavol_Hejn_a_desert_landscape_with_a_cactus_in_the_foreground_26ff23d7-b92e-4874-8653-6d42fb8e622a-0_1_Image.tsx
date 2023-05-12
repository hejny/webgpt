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
import colorStats from './Pavol_Hejn_a_desert_landscape_with_a_cactus_in_the_foreground_26ff23d7-b92e-4874-8653-6d42fb8e622a-0_1.colors.json';
import metadata from './Pavol_Hejn_a_desert_landscape_with_a_cactus_in_the_foreground_26ff23d7-b92e-4874-8653-6d42fb8e622a-0_1.json';
import source from 'https://cdn.midjourney.com/26ff23d7-b92e-4874-8653-6d42fb8e622a/0_1.png';
import texts from './Pavol_Hejn_a_desert_landscape_with_a_cactus_in_the_foreground_26ff23d7-b92e-4874-8653-6d42fb8e622a-0_1.texts.json';

/**
 * Image of A desert landscape with a cactus in the foreground
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ADesertLandscapeWithACactusInTheForeground26ff23d7B92e487486536d42fb8e622a0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A desert landscape with a cactus in the foreground"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ADesertLandscapeWithACactusInTheForeground26ff23d7B92e487486536d42fb8e622a0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ADesertLandscapeWithACactusInTheForeground26ff23d7B92e487486536d42fb8e622a0_1_Image.colorStats =
    hydrateColorStats(colorStats);
ADesertLandscapeWithACactusInTheForeground26ff23d7B92e487486536d42fb8e622a0_1_Image.texts =
    texts satisfies IWallpaperTexts;
