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
import colorStats from './Pavol_Hejn_an_abstract_circuit_board_pattern_in_shades_of_blue__b226ddeb-42af-4501-a77c-22303d827ff4-0_3.colors.json';
import metadata from './Pavol_Hejn_an_abstract_circuit_board_pattern_in_shades_of_blue__b226ddeb-42af-4501-a77c-22303d827ff4-0_3.json';
import texts from './Pavol_Hejn_an_abstract_circuit_board_pattern_in_shades_of_blue__b226ddeb-42af-4501-a77c-22303d827ff4-0_3.texts.json';

/**
 * Image of An abstract circuit board pattern in shades of blue and silver
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AnAbstractCircuitBoardPatternInShadesOfBlueB226ddeb42af4501A77c22303d827ff40_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract circuit board pattern in shades of blue and silver"
            src="https://cdn.midjourney.com/b226ddeb-42af-4501-a77c-22303d827ff4/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractCircuitBoardPatternInShadesOfBlueB226ddeb42af4501A77c22303d827ff40_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractCircuitBoardPatternInShadesOfBlueB226ddeb42af4501A77c22303d827ff40_3_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractCircuitBoardPatternInShadesOfBlueB226ddeb42af4501A77c22303d827ff40_3_Image.texts =
    texts satisfies IWallpaperTexts;
