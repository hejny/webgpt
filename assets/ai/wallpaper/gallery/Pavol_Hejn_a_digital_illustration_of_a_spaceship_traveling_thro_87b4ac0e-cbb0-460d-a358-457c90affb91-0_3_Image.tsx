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
import colorStats from './Pavol_Hejn_a_digital_illustration_of_a_spaceship_traveling_thro_87b4ac0e-cbb0-460d-a358-457c90affb91-0_3.colors.json';
import metadata from './Pavol_Hejn_a_digital_illustration_of_a_spaceship_traveling_thro_87b4ac0e-cbb0-460d-a358-457c90affb91-0_3.json';
import source from 'https://cdn.midjourney.com/87b4ac0e-cbb0-460d-a358-457c90affb91/0_3.png';
import texts from './Pavol_Hejn_a_digital_illustration_of_a_spaceship_traveling_thro_87b4ac0e-cbb0-460d-a358-457c90affb91-0_3.texts.json';

/**
 * Image of A digital illustration of a spaceship traveling through a colorful nebula.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ADigitalIllustrationOfASpaceshipTravelingThro87b4ac0eCbb0460dA358457c90affb910_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A digital illustration of a spaceship traveling through a colorful nebula."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ADigitalIllustrationOfASpaceshipTravelingThro87b4ac0eCbb0460dA358457c90affb910_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ADigitalIllustrationOfASpaceshipTravelingThro87b4ac0eCbb0460dA358457c90affb910_3_Image.colorStats =
    hydrateColorStats(colorStats);
ADigitalIllustrationOfASpaceshipTravelingThro87b4ac0eCbb0460dA358457c90affb910_3_Image.texts =
    texts satisfies IWallpaperTexts;
