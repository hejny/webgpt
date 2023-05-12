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
import colorStats from './Pavol_Hejn_a_retro_poster_style_image_of_a_spaceship_in_orbit_a_ffd0e6d9-3ba7-44bf-8ea6-83545bd6a211-0_3.colors.json';
import metadata from './Pavol_Hejn_a_retro_poster_style_image_of_a_spaceship_in_orbit_a_ffd0e6d9-3ba7-44bf-8ea6-83545bd6a211-0_3.json';
import source from 'https://cdn.midjourney.com/ffd0e6d9-3ba7-44bf-8ea6-83545bd6a211/0_3.png';
import texts from './Pavol_Hejn_a_retro_poster_style_image_of_a_spaceship_in_orbit_a_ffd0e6d9-3ba7-44bf-8ea6-83545bd6a211-0_3.texts.json';

/**
 * Image of A retro poster-style image of a spaceship in orbit around Earth, with bold colors and typography.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ARetroPosterStyleImageOfASpaceshipInOrbitAFfd0e6d93ba744bf8ea683545bd6a2110_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A retro poster-style image of a spaceship in orbit around Earth, with bold colors and typography."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ARetroPosterStyleImageOfASpaceshipInOrbitAFfd0e6d93ba744bf8ea683545bd6a2110_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ARetroPosterStyleImageOfASpaceshipInOrbitAFfd0e6d93ba744bf8ea683545bd6a2110_3_Image.colorStats =
    hydrateColorStats(colorStats);
ARetroPosterStyleImageOfASpaceshipInOrbitAFfd0e6d93ba744bf8ea683545bd6a2110_3_Image.texts =
    texts satisfies IWallpaperTexts;
