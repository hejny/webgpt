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
import colorStats from './Pavol_Hejn_an_abstract_image_of_swirling_smoke_and_fire_for_a_c_49c9efff-cce8-4fbe-92f7-90e931b5530c-0_3.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_swirling_smoke_and_fire_for_a_c_49c9efff-cce8-4fbe-92f7-90e931b5530c-0_3.json';
import texts from './Pavol_Hejn_an_abstract_image_of_swirling_smoke_and_fire_for_a_c_49c9efff-cce8-4fbe-92f7-90e931b5530c-0_3.texts.json';

/**
 * Image of An abstract image of swirling smoke and fire for a cooking or food blog
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfSwirlingSmokeAndFireForAC49c9efffCce84fbe92f790e931b5530c0_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of swirling smoke and fire for a cooking or food blog"
            src="https://cdn.midjourney.com/49c9efff-cce8-4fbe-92f7-90e931b5530c/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfSwirlingSmokeAndFireForAC49c9efffCce84fbe92f790e931b5530c0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfSwirlingSmokeAndFireForAC49c9efffCce84fbe92f790e931b5530c0_3_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfSwirlingSmokeAndFireForAC49c9efffCce84fbe92f790e931b5530c0_3_Image.texts =
    texts satisfies IWallpaperTexts;
