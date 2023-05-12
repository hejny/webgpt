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
import colorStats from './Pavol_Hejn_a_wallpaper_featuring_a_simple_graphic_of_a_digital__22fa9cc9-d345-4fad-aaf6-3c954b579f36-0_2.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_featuring_a_simple_graphic_of_a_digital__22fa9cc9-d345-4fad-aaf6-3c954b579f36-0_2.json';
import source from 'https://cdn.midjourney.com/22fa9cc9-d345-4fad-aaf6-3c954b579f36/0_2.png';
import texts from './Pavol_Hejn_a_wallpaper_featuring_a_simple_graphic_of_a_digital__22fa9cc9-d345-4fad-aaf6-3c954b579f36-0_2.texts.json';

/**
 * Image of A wallpaper featuring a simple graphic of a digital clock or timer, with space for setting alarms and countdowns, set against a gradient background.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AWallpaperFeaturingASimpleGraphicOfADigital2fa9cc9D3454fadAaf63c954b579f3602_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper featuring a simple graphic of a digital clock or timer, with space for setting alarms and countdowns, set against a gradient background."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperFeaturingASimpleGraphicOfADigital2fa9cc9D3454fadAaf63c954b579f3602_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperFeaturingASimpleGraphicOfADigital2fa9cc9D3454fadAaf63c954b579f3602_2_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperFeaturingASimpleGraphicOfADigital2fa9cc9D3454fadAaf63c954b579f3602_2_Image.texts =
    texts satisfies IWallpaperTexts;
