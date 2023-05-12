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
import colorStats from './Pavol_Hejn_a_vintage_style_travel_poster_of_a_distant_planet_wi_eeecd44a-53a9-44ed-8f3e-89aa7e7919e9-0_0.colors.json';
import metadata from './Pavol_Hejn_a_vintage_style_travel_poster_of_a_distant_planet_wi_eeecd44a-53a9-44ed-8f3e-89aa7e7919e9-0_0.json';
import source from 'https://cdn.midjourney.com/eeecd44a-53a9-44ed-8f3e-89aa7e7919e9/0_0.png';
import texts from './Pavol_Hejn_a_vintage_style_travel_poster_of_a_distant_planet_wi_eeecd44a-53a9-44ed-8f3e-89aa7e7919e9-0_0.texts.json';

/**
 * Image of A vintage-style travel poster of a distant planet, with bold typography and an artistic rendering of the landscape.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AVintageStyleTravelPosterOfADistantPlanetWiEeecd44a53a944ed8f3e89aa7e7919e90_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A vintage-style travel poster of a distant planet, with bold typography and an artistic rendering of the landscape."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AVintageStyleTravelPosterOfADistantPlanetWiEeecd44a53a944ed8f3e89aa7e7919e90_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AVintageStyleTravelPosterOfADistantPlanetWiEeecd44a53a944ed8f3e89aa7e7919e90_0_Image.colorStats =
    hydrateColorStats(colorStats);
AVintageStyleTravelPosterOfADistantPlanetWiEeecd44a53a944ed8f3e89aa7e7919e90_0_Image.texts =
    texts satisfies IWallpaperTexts;
