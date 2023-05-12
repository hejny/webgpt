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
import colorStats from './Pavol_Hejn_a_vintage_map_of_the_stars_and_constellations_with_d_7318ec8e-f7d6-4887-8256-c6ed1fe54153-0_0.colors.json';
import metadata from './Pavol_Hejn_a_vintage_map_of_the_stars_and_constellations_with_d_7318ec8e-f7d6-4887-8256-c6ed1fe54153-0_0.json';
import source from 'https://cdn.midjourney.com/7318ec8e-f7d6-4887-8256-c6ed1fe54153/0_0.png';
import texts from './Pavol_Hejn_a_vintage_map_of_the_stars_and_constellations_with_d_7318ec8e-f7d6-4887-8256-c6ed1fe54153-0_0.texts.json';

/**
 * Image of A vintage map of the stars and constellations, with detailed illustrations of spacecraft and celestial bodies.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AVintageMapOfTheStarsAndConstellationsWithD7318ec8eF7d648878256C6ed1fe541530_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A vintage map of the stars and constellations, with detailed illustrations of spacecraft and celestial bodies."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AVintageMapOfTheStarsAndConstellationsWithD7318ec8eF7d648878256C6ed1fe541530_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AVintageMapOfTheStarsAndConstellationsWithD7318ec8eF7d648878256C6ed1fe541530_0_Image.colorStats =
    hydrateColorStats(colorStats);
AVintageMapOfTheStarsAndConstellationsWithD7318ec8eF7d648878256C6ed1fe541530_0_Image.texts =
    texts satisfies IWallpaperTexts;
