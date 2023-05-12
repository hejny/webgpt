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
import colorStats from './Pavol_Hejn_an_image_of_a_rocket_launching_into_space_with_a_tra_cf5af743-d673-41dc-b7b1-ab3d1ee1a0a4-0_0.colors.json';
import metadata from './Pavol_Hejn_an_image_of_a_rocket_launching_into_space_with_a_tra_cf5af743-d673-41dc-b7b1-ab3d1ee1a0a4-0_0.json';
import texts from './Pavol_Hejn_an_image_of_a_rocket_launching_into_space_with_a_tra_cf5af743-d673-41dc-b7b1-ab3d1ee1a0a4-0_0.texts.json';

/**
 * Image of An image of a rocket launching into space with a trail of fire behind it, set against a starry sky.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AnImageOfARocketLaunchingIntoSpaceWithATraCf5af743D67341dcB7b1Ab3d1ee1a0a40_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An image of a rocket launching into space with a trail of fire behind it, set against a starry sky."
            src="https://cdn.midjourney.com/cf5af743-d673-41dc-b7b1-ab3d1ee1a0a4/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnImageOfARocketLaunchingIntoSpaceWithATraCf5af743D67341dcB7b1Ab3d1ee1a0a40_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnImageOfARocketLaunchingIntoSpaceWithATraCf5af743D67341dcB7b1Ab3d1ee1a0a40_0_Image.colorStats =
    hydrateColorStats(colorStats);
AnImageOfARocketLaunchingIntoSpaceWithATraCf5af743D67341dcB7b1Ab3d1ee1a0a40_0_Image.texts =
    texts satisfies IWallpaperTexts;
