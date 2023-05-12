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
import colorStats from './Pavol_Hejn_a_poster_style_image_of_a_rocket_taking_off_from_ear_334670bd-c4c5-4513-a278-3e34f6dec00d-0_0.colors.json';
import metadata from './Pavol_Hejn_a_poster_style_image_of_a_rocket_taking_off_from_ear_334670bd-c4c5-4513-a278-3e34f6dec00d-0_0.json';
import source from 'https://cdn.midjourney.com/334670bd-c4c5-4513-a278-3e34f6dec00d/0_0.png';
import texts from './Pavol_Hejn_a_poster_style_image_of_a_rocket_taking_off_from_ear_334670bd-c4c5-4513-a278-3e34f6dec00d-0_0.texts.json';

/**
 * Image of A poster-style image of a rocket taking off from Earth, with bold typography and a vintage color scheme that adds a touch of nostalgia.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function APosterStyleImageOfARocketTakingOffFromEar334670bdC4c54513A2783e34f6dec00d0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A poster-style image of a rocket taking off from Earth, with bold typography and a vintage color scheme that adds a touch of nostalgia."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

APosterStyleImageOfARocketTakingOffFromEar334670bdC4c54513A2783e34f6dec00d0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
APosterStyleImageOfARocketTakingOffFromEar334670bdC4c54513A2783e34f6dec00d0_0_Image.colorStats =
    hydrateColorStats(colorStats);
APosterStyleImageOfARocketTakingOffFromEar334670bdC4c54513A2783e34f6dec00d0_0_Image.texts =
    texts satisfies IWallpaperTexts;
