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
import colorStats from './Pavol_Hejn_an_impressionist_style_painting_of_a_futuristic_city_6cf7e8b2-116e-4d5e-b995-66f64fced840-0_0.colors.json';
import metadata from './Pavol_Hejn_an_impressionist_style_painting_of_a_futuristic_city_6cf7e8b2-116e-4d5e-b995-66f64fced840-0_0.json';
import source from 'https://cdn.midjourney.com/6cf7e8b2-116e-4d5e-b995-66f64fced840/0_0.png';
import texts from './Pavol_Hejn_an_impressionist_style_painting_of_a_futuristic_city_6cf7e8b2-116e-4d5e-b995-66f64fced840-0_0.texts.json';

/**
 * Image of An impressionist-style painting of a futuristic cityscape, with blurred lines and bold colors creating a dreamy effect.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AnImpressionistStylePaintingOfAFuturisticCity6cf7e8b2116e4d5eB99566f64fced8400_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An impressionist-style painting of a futuristic cityscape, with blurred lines and bold colors creating a dreamy effect."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnImpressionistStylePaintingOfAFuturisticCity6cf7e8b2116e4d5eB99566f64fced8400_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnImpressionistStylePaintingOfAFuturisticCity6cf7e8b2116e4d5eB99566f64fced8400_0_Image.colorStats =
    hydrateColorStats(colorStats);
AnImpressionistStylePaintingOfAFuturisticCity6cf7e8b2116e4d5eB99566f64fced8400_0_Image.texts =
    texts satisfies IWallpaperTexts;
