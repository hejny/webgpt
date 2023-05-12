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
import colorStats from './Pavol_Hejn_sunrise_on_a_distant_planet_1dbf75d0-2408-4d4c-818a-14c1fca69136-0_0.colors.json';
import metadata from './Pavol_Hejn_sunrise_on_a_distant_planet_1dbf75d0-2408-4d4c-818a-14c1fca69136-0_0.json';
import texts from './Pavol_Hejn_sunrise_on_a_distant_planet_1dbf75d0-2408-4d4c-818a-14c1fca69136-0_0.texts.json';

/**
 * Image of Sunrise on a distant planet
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function SunriseOnADistantPlanet1dbf75d024084d4c818a14c1fca691360_0_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="Sunrise on a distant planet"
            src="https://cdn.midjourney.com/1dbf75d0-2408-4d4c-818a-14c1fca69136/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

SunriseOnADistantPlanet1dbf75d024084d4c818a14c1fca691360_0_Image.metadata = metadata satisfies IWallpaperMetadata;
SunriseOnADistantPlanet1dbf75d024084d4c818a14c1fca691360_0_Image.colorStats = hydrateColorStats(colorStats);
SunriseOnADistantPlanet1dbf75d024084d4c818a14c1fca691360_0_Image.texts = texts satisfies IWallpaperTexts;
