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
import colorStats from './Pavol_Hejn_a_close_up_of_a_bee_on_a_flower_f3923698-6a5a-41e6-ab15-095db6a35598-0_2.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_a_bee_on_a_flower_f3923698-6a5a-41e6-ab15-095db6a35598-0_2.json';
import texts from './Pavol_Hejn_a_close_up_of_a_bee_on_a_flower_f3923698-6a5a-41e6-ab15-095db6a35598-0_2.texts.json';

/**
 * Image of A close-up of a bee on a flower
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfABeeOnAFlowerF39236986a5a41e6Ab15095db6a355980_2_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up of a bee on a flower"
            src="https://cdn.midjourney.com/f3923698-6a5a-41e6-ab15-095db6a35598/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpOfABeeOnAFlowerF39236986a5a41e6Ab15095db6a355980_2_Image.metadata = metadata satisfies IWallpaperMetadata;
ACloseUpOfABeeOnAFlowerF39236986a5a41e6Ab15095db6a355980_2_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfABeeOnAFlowerF39236986a5a41e6Ab15095db6a355980_2_Image.texts = texts satisfies IWallpaperTexts;
