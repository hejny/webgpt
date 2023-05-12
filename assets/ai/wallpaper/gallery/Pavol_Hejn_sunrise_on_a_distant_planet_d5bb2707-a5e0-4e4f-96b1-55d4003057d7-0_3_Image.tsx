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
import colorStats from './Pavol_Hejn_sunrise_on_a_distant_planet_d5bb2707-a5e0-4e4f-96b1-55d4003057d7-0_3.colors.json';
import metadata from './Pavol_Hejn_sunrise_on_a_distant_planet_d5bb2707-a5e0-4e4f-96b1-55d4003057d7-0_3.json';
import source from 'https://cdn.midjourney.com/d5bb2707-a5e0-4e4f-96b1-55d4003057d7/0_3.png';
import texts from './Pavol_Hejn_sunrise_on_a_distant_planet_d5bb2707-a5e0-4e4f-96b1-55d4003057d7-0_3.texts.json';

/**
 * Image of Sunrise on a distant planet
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function SunriseOnADistantPlanetD5bb2707A5e04e4f96b155d4003057d70_3_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="Sunrise on a distant planet"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

SunriseOnADistantPlanetD5bb2707A5e04e4f96b155d4003057d70_3_Image.metadata = metadata satisfies IWallpaperMetadata;
SunriseOnADistantPlanetD5bb2707A5e04e4f96b155d4003057d70_3_Image.colorStats = hydrateColorStats(colorStats);
SunriseOnADistantPlanetD5bb2707A5e04e4f96b155d4003057d70_3_Image.texts = texts satisfies IWallpaperTexts;
