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
import colorStats from './Pavol_Hejn_an_illustration_of_a_futuristic_astronaut_in_a_sleek_efccf71a-02b5-4d30-896a-7c0462bce256-0_2.colors.json';
import metadata from './Pavol_Hejn_an_illustration_of_a_futuristic_astronaut_in_a_sleek_efccf71a-02b5-4d30-896a-7c0462bce256-0_2.json';
import source from 'https://cdn.midjourney.com/efccf71a-02b5-4d30-896a-7c0462bce256/0_2.png';
import texts from './Pavol_Hejn_an_illustration_of_a_futuristic_astronaut_in_a_sleek_efccf71a-02b5-4d30-896a-7c0462bce256-0_2.texts.json';

/**
 * Image of An illustration of a futuristic astronaut in a sleek spacesuit, standing on the surface of a distant planet.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AnIllustrationOfAFuturisticAstronautInASleekEfccf71a02b54d30896a7c0462bce2560_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An illustration of a futuristic astronaut in a sleek spacesuit, standing on the surface of a distant planet."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnIllustrationOfAFuturisticAstronautInASleekEfccf71a02b54d30896a7c0462bce2560_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnIllustrationOfAFuturisticAstronautInASleekEfccf71a02b54d30896a7c0462bce2560_2_Image.colorStats =
    hydrateColorStats(colorStats);
AnIllustrationOfAFuturisticAstronautInASleekEfccf71a02b54d30896a7c0462bce2560_2_Image.texts =
    texts satisfies IWallpaperTexts;
