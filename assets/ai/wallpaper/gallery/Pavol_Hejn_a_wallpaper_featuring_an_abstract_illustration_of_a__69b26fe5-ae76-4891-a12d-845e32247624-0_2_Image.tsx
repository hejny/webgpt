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
import colorStats from './Pavol_Hejn_a_wallpaper_featuring_an_abstract_illustration_of_a__69b26fe5-ae76-4891-a12d-845e32247624-0_2.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_featuring_an_abstract_illustration_of_a__69b26fe5-ae76-4891-a12d-845e32247624-0_2.json';
import source from 'https://cdn.midjourney.com/69b26fe5-ae76-4891-a12d-845e32247624/0_2.png';
import texts from './Pavol_Hejn_a_wallpaper_featuring_an_abstract_illustration_of_a__69b26fe5-ae76-4891-a12d-845e32247624-0_2.texts.json';

/**
 * Image of A wallpaper featuring an abstract illustration of a dark and ominous machine, with glowing red lights and mechanical parts.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AWallpaperFeaturingAnAbstractIllustrationOfA69b26fe5Ae764891A12d845e322476240_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper featuring an abstract illustration of a dark and ominous machine, with glowing red lights and mechanical parts."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperFeaturingAnAbstractIllustrationOfA69b26fe5Ae764891A12d845e322476240_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperFeaturingAnAbstractIllustrationOfA69b26fe5Ae764891A12d845e322476240_2_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperFeaturingAnAbstractIllustrationOfA69b26fe5Ae764891A12d845e322476240_2_Image.texts =
    texts satisfies IWallpaperTexts;
