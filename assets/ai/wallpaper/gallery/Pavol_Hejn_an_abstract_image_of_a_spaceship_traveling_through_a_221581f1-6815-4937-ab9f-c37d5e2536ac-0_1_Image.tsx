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
import colorStats from './Pavol_Hejn_an_abstract_image_of_a_spaceship_traveling_through_a_221581f1-6815-4937-ab9f-c37d5e2536ac-0_1.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_a_spaceship_traveling_through_a_221581f1-6815-4937-ab9f-c37d5e2536ac-0_1.json';
import texts from './Pavol_Hejn_an_abstract_image_of_a_spaceship_traveling_through_a_221581f1-6815-4937-ab9f-c37d5e2536ac-0_1.texts.json';

/**
 * Image of An abstract image of a spaceship traveling through a wormhole, with bright colors and surreal patterns.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfASpaceshipTravelingThroughA221581f168154937Ab9fC37d5e2536ac0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of a spaceship traveling through a wormhole, with bright colors and surreal patterns."
            src="https://cdn.midjourney.com/221581f1-6815-4937-ab9f-c37d5e2536ac/0_1.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfASpaceshipTravelingThroughA221581f168154937Ab9fC37d5e2536ac0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfASpaceshipTravelingThroughA221581f168154937Ab9fC37d5e2536ac0_1_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfASpaceshipTravelingThroughA221581f168154937Ab9fC37d5e2536ac0_1_Image.texts =
    texts satisfies IWallpaperTexts;
