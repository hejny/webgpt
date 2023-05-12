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
import colorStats from './Pavol_Hejn_a_photograph_of_a_meteor_shower_with_bright_streaks__524be76c-e273-4cd5-80e2-20b9e59d174f-0_0.colors.json';
import metadata from './Pavol_Hejn_a_photograph_of_a_meteor_shower_with_bright_streaks__524be76c-e273-4cd5-80e2-20b9e59d174f-0_0.json';
import source from 'https://cdn.midjourney.com/524be76c-e273-4cd5-80e2-20b9e59d174f/0_0.png';
import texts from './Pavol_Hejn_a_photograph_of_a_meteor_shower_with_bright_streaks__524be76c-e273-4cd5-80e2-20b9e59d174f-0_0.texts.json';

/**
 * Image of A photograph of a meteor shower, with bright streaks of light crossing the night sky.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function APhotographOfAMeteorShowerWithBrightStreaks524be76cE2734cd580e220b9e59d174f0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A photograph of a meteor shower, with bright streaks of light crossing the night sky."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

APhotographOfAMeteorShowerWithBrightStreaks524be76cE2734cd580e220b9e59d174f0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
APhotographOfAMeteorShowerWithBrightStreaks524be76cE2734cd580e220b9e59d174f0_0_Image.colorStats =
    hydrateColorStats(colorStats);
APhotographOfAMeteorShowerWithBrightStreaks524be76cE2734cd580e220b9e59d174f0_0_Image.texts =
    texts satisfies IWallpaperTexts;
