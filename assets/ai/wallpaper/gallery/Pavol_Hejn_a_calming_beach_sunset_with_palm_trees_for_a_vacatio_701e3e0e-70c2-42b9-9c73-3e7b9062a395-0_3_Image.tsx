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
import colorStats from './Pavol_Hejn_a_calming_beach_sunset_with_palm_trees_for_a_vacatio_701e3e0e-70c2-42b9-9c73-3e7b9062a395-0_3.colors.json';
import metadata from './Pavol_Hejn_a_calming_beach_sunset_with_palm_trees_for_a_vacatio_701e3e0e-70c2-42b9-9c73-3e7b9062a395-0_3.json';
import texts from './Pavol_Hejn_a_calming_beach_sunset_with_palm_trees_for_a_vacatio_701e3e0e-70c2-42b9-9c73-3e7b9062a395-0_3.texts.json';

/**
 * Image of A calming beach sunset with palm trees for a vacation rental or real estate website
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ACalmingBeachSunsetWithPalmTreesForAVacatio701e3e0e70c242b99c733e7b9062a3950_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A calming beach sunset with palm trees for a vacation rental or real estate website"
            src="https://cdn.midjourney.com/701e3e0e-70c2-42b9-9c73-3e7b9062a395/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACalmingBeachSunsetWithPalmTreesForAVacatio701e3e0e70c242b99c733e7b9062a3950_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ACalmingBeachSunsetWithPalmTreesForAVacatio701e3e0e70c242b99c733e7b9062a3950_3_Image.colorStats =
    hydrateColorStats(colorStats);
ACalmingBeachSunsetWithPalmTreesForAVacatio701e3e0e70c242b99c733e7b9062a3950_3_Image.texts =
    texts satisfies IWallpaperTexts;
