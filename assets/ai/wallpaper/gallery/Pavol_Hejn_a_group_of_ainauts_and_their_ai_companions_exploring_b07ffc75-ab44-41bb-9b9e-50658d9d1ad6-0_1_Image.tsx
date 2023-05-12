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
import colorStats from './Pavol_Hejn_a_group_of_ainauts_and_their_ai_companions_exploring_b07ffc75-ab44-41bb-9b9e-50658d9d1ad6-0_1.colors.json';
import metadata from './Pavol_Hejn_a_group_of_ainauts_and_their_ai_companions_exploring_b07ffc75-ab44-41bb-9b9e-50658d9d1ad6-0_1.json';
import texts from './Pavol_Hejn_a_group_of_ainauts_and_their_ai_companions_exploring_b07ffc75-ab44-41bb-9b9e-50658d9d1ad6-0_1.texts.json';

/**
 * Image of A group of AInauts and their AI companions exploring a massive, abandoned spacecraft floating in the depths of space.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AGroupOfAinautsAndTheirAiCompanionsExploringB07ffc75Ab4441bb9b9e50658d9d1ad60_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A group of AInauts and their AI companions exploring a massive, abandoned spacecraft floating in the depths of space."
            src="https://cdn.midjourney.com/b07ffc75-ab44-41bb-9b9e-50658d9d1ad6/0_1.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AGroupOfAinautsAndTheirAiCompanionsExploringB07ffc75Ab4441bb9b9e50658d9d1ad60_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AGroupOfAinautsAndTheirAiCompanionsExploringB07ffc75Ab4441bb9b9e50658d9d1ad60_1_Image.colorStats =
    hydrateColorStats(colorStats);
AGroupOfAinautsAndTheirAiCompanionsExploringB07ffc75Ab4441bb9b9e50658d9d1ad60_1_Image.texts =
    texts satisfies IWallpaperTexts;
