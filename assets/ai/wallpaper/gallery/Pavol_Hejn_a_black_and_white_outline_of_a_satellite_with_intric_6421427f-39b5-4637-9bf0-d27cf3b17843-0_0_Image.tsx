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
import colorStats from './Pavol_Hejn_a_black_and_white_outline_of_a_satellite_with_intric_6421427f-39b5-4637-9bf0-d27cf3b17843-0_0.colors.json';
import metadata from './Pavol_Hejn_a_black_and_white_outline_of_a_satellite_with_intric_6421427f-39b5-4637-9bf0-d27cf3b17843-0_0.json';
import texts from './Pavol_Hejn_a_black_and_white_outline_of_a_satellite_with_intric_6421427f-39b5-4637-9bf0-d27cf3b17843-0_0.texts.json';

/**
 * Image of A black and white outline of a satellite, with intricate details that showcase its technical components and purpose.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ABlackAndWhiteOutlineOfASatelliteWithIntric6421427f39b546379bf0D27cf3b178430_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A black and white outline of a satellite, with intricate details that showcase its technical components and purpose."
            src="https://cdn.midjourney.com/6421427f-39b5-4637-9bf0-d27cf3b17843/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ABlackAndWhiteOutlineOfASatelliteWithIntric6421427f39b546379bf0D27cf3b178430_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ABlackAndWhiteOutlineOfASatelliteWithIntric6421427f39b546379bf0D27cf3b178430_0_Image.colorStats =
    hydrateColorStats(colorStats);
ABlackAndWhiteOutlineOfASatelliteWithIntric6421427f39b546379bf0D27cf3b178430_0_Image.texts =
    texts satisfies IWallpaperTexts;
