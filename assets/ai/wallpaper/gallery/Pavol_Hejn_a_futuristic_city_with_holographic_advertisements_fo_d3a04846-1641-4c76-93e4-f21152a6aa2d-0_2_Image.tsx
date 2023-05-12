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
import colorStats from './Pavol_Hejn_a_futuristic_city_with_holographic_advertisements_fo_d3a04846-1641-4c76-93e4-f21152a6aa2d-0_2.colors.json';
import metadata from './Pavol_Hejn_a_futuristic_city_with_holographic_advertisements_fo_d3a04846-1641-4c76-93e4-f21152a6aa2d-0_2.json';
import source from 'https://cdn.midjourney.com/d3a04846-1641-4c76-93e4-f21152a6aa2d/0_2.png';
import texts from './Pavol_Hejn_a_futuristic_city_with_holographic_advertisements_fo_d3a04846-1641-4c76-93e4-f21152a6aa2d-0_2.texts.json';

/**
 * Image of A futuristic city with holographic advertisements for a tech or innovation website
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AFuturisticCityWithHolographicAdvertisementsFoD3a0484616414c7693e4F21152a6aa2d0_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A futuristic city with holographic advertisements for a tech or innovation website"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AFuturisticCityWithHolographicAdvertisementsFoD3a0484616414c7693e4F21152a6aa2d0_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AFuturisticCityWithHolographicAdvertisementsFoD3a0484616414c7693e4F21152a6aa2d0_2_Image.colorStats =
    hydrateColorStats(colorStats);
AFuturisticCityWithHolographicAdvertisementsFoD3a0484616414c7693e4F21152a6aa2d0_2_Image.texts =
    texts satisfies IWallpaperTexts;
