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
import colorStats from './Pavol_Hejn_a_digital_illustration_of_a_city_on_a_distant_planet_719bc302-0491-47aa-8bd4-986ff45dec13-0_1.colors.json';
import metadata from './Pavol_Hejn_a_digital_illustration_of_a_city_on_a_distant_planet_719bc302-0491-47aa-8bd4-986ff45dec13-0_1.json';
import source from 'https://cdn.midjourney.com/719bc302-0491-47aa-8bd4-986ff45dec13/0_1.png';
import texts from './Pavol_Hejn_a_digital_illustration_of_a_city_on_a_distant_planet_719bc302-0491-47aa-8bd4-986ff45dec13-0_1.texts.json';

/**
 * Image of A digital illustration of a city on a distant planet, with towering buildings and advanced technology.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ADigitalIllustrationOfACityOnADistantPlanet719bc302049147aa8bd4986ff45dec130_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A digital illustration of a city on a distant planet, with towering buildings and advanced technology."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ADigitalIllustrationOfACityOnADistantPlanet719bc302049147aa8bd4986ff45dec130_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ADigitalIllustrationOfACityOnADistantPlanet719bc302049147aa8bd4986ff45dec130_1_Image.colorStats =
    hydrateColorStats(colorStats);
ADigitalIllustrationOfACityOnADistantPlanet719bc302049147aa8bd4986ff45dec130_1_Image.texts =
    texts satisfies IWallpaperTexts;
