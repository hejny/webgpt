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
import colorStats from './Pavol_Hejn_ainauts_and_their_ai_companions_conducting_experimen_15a86695-41d3-4d75-bd54-f78d9b6a23be-0_2.colors.json';
import metadata from './Pavol_Hejn_ainauts_and_their_ai_companions_conducting_experimen_15a86695-41d3-4d75-bd54-f78d9b6a23be-0_2.json';
import texts from './Pavol_Hejn_ainauts_and_their_ai_companions_conducting_experimen_15a86695-41d3-4d75-bd54-f78d9b6a23be-0_2.texts.json';

/**
 * Image of AInauts and their AI companions conducting experiments in a zero-gravity laboratory, with colorful chemicals and particles floating all around them.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AinautsAndTheirAiCompanionsConductingExperimen15a8669541d34d75Bd54F78d9b6a23be0_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="AInauts and their AI companions conducting experiments in a zero-gravity laboratory, with colorful chemicals and particles floating all around them."
            src="https://cdn.midjourney.com/15a86695-41d3-4d75-bd54-f78d9b6a23be/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AinautsAndTheirAiCompanionsConductingExperimen15a8669541d34d75Bd54F78d9b6a23be0_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AinautsAndTheirAiCompanionsConductingExperimen15a8669541d34d75Bd54F78d9b6a23be0_2_Image.colorStats =
    hydrateColorStats(colorStats);
AinautsAndTheirAiCompanionsConductingExperimen15a8669541d34d75Bd54F78d9b6a23be0_2_Image.texts =
    texts satisfies IWallpaperTexts;
