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
import colorStats from './Pavol_Hejn_an_illustration_of_a_robotic_explorer_with_metallic__5c52f972-0825-4c17-8df0-eb2dfb077c29-0_3.colors.json';
import metadata from './Pavol_Hejn_an_illustration_of_a_robotic_explorer_with_metallic__5c52f972-0825-4c17-8df0-eb2dfb077c29-0_3.json';
import source from 'https://cdn.midjourney.com/5c52f972-0825-4c17-8df0-eb2dfb077c29/0_3.png';
import texts from './Pavol_Hejn_an_illustration_of_a_robotic_explorer_with_metallic__5c52f972-0825-4c17-8df0-eb2dfb077c29-0_3.texts.json';

/**
 * Image of An illustration of a robotic explorer, with metallic textures and intricate details.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AnIllustrationOfARoboticExplorerWithMetallic5c52f97208254c178df0Eb2dfb077c290_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An illustration of a robotic explorer, with metallic textures and intricate details."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnIllustrationOfARoboticExplorerWithMetallic5c52f97208254c178df0Eb2dfb077c290_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnIllustrationOfARoboticExplorerWithMetallic5c52f97208254c178df0Eb2dfb077c290_3_Image.colorStats =
    hydrateColorStats(colorStats);
AnIllustrationOfARoboticExplorerWithMetallic5c52f97208254c178df0Eb2dfb077c290_3_Image.texts =
    texts satisfies IWallpaperTexts;
