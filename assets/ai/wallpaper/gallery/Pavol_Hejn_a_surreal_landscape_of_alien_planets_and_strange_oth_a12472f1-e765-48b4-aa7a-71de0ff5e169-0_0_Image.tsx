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
import colorStats from './Pavol_Hejn_a_surreal_landscape_of_alien_planets_and_strange_oth_a12472f1-e765-48b4-aa7a-71de0ff5e169-0_0.colors.json';
import metadata from './Pavol_Hejn_a_surreal_landscape_of_alien_planets_and_strange_oth_a12472f1-e765-48b4-aa7a-71de0ff5e169-0_0.json';
import source from 'https://cdn.midjourney.com/a12472f1-e765-48b4-aa7a-71de0ff5e169/0_0.png';
import texts from './Pavol_Hejn_a_surreal_landscape_of_alien_planets_and_strange_oth_a12472f1-e765-48b4-aa7a-71de0ff5e169-0_0.texts.json';

/**
 * Image of A surreal landscape of alien planets and strange, otherworldly creatures.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ASurrealLandscapeOfAlienPlanetsAndStrangeOthA12472f1E76548b4Aa7a71de0ff5e1690_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A surreal landscape of alien planets and strange, otherworldly creatures."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ASurrealLandscapeOfAlienPlanetsAndStrangeOthA12472f1E76548b4Aa7a71de0ff5e1690_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ASurrealLandscapeOfAlienPlanetsAndStrangeOthA12472f1E76548b4Aa7a71de0ff5e1690_0_Image.colorStats =
    hydrateColorStats(colorStats);
ASurrealLandscapeOfAlienPlanetsAndStrangeOthA12472f1E76548b4Aa7a71de0ff5e1690_0_Image.texts =
    texts satisfies IWallpaperTexts;
