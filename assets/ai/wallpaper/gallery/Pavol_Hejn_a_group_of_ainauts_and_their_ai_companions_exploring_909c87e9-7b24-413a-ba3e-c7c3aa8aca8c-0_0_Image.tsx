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
import colorStats from './Pavol_Hejn_a_group_of_ainauts_and_their_ai_companions_exploring_909c87e9-7b24-413a-ba3e-c7c3aa8aca8c-0_0.colors.json';
import metadata from './Pavol_Hejn_a_group_of_ainauts_and_their_ai_companions_exploring_909c87e9-7b24-413a-ba3e-c7c3aa8aca8c-0_0.json';
import texts from './Pavol_Hejn_a_group_of_ainauts_and_their_ai_companions_exploring_909c87e9-7b24-413a-ba3e-c7c3aa8aca8c-0_0.texts.json';

/**
 * Image of A group of AInauts and their AI companions exploring a massive, abandoned research facility in the depths of space.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AGroupOfAinautsAndTheirAiCompanionsExploring909c87e97b24413aBa3eC7c3aa8aca8c0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A group of AInauts and their AI companions exploring a massive, abandoned research facility in the depths of space."
            src="https://cdn.midjourney.com/909c87e9-7b24-413a-ba3e-c7c3aa8aca8c/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AGroupOfAinautsAndTheirAiCompanionsExploring909c87e97b24413aBa3eC7c3aa8aca8c0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AGroupOfAinautsAndTheirAiCompanionsExploring909c87e97b24413aBa3eC7c3aa8aca8c0_0_Image.colorStats =
    hydrateColorStats(colorStats);
AGroupOfAinautsAndTheirAiCompanionsExploring909c87e97b24413aBa3eC7c3aa8aca8c0_0_Image.texts =
    texts satisfies IWallpaperTexts;
