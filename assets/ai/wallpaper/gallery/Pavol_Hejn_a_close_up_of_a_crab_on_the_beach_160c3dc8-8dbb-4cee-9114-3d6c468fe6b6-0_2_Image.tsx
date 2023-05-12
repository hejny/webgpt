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
import colorStats from './Pavol_Hejn_a_close_up_of_a_crab_on_the_beach_160c3dc8-8dbb-4cee-9114-3d6c468fe6b6-0_2.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_a_crab_on_the_beach_160c3dc8-8dbb-4cee-9114-3d6c468fe6b6-0_2.json';
import texts from './Pavol_Hejn_a_close_up_of_a_crab_on_the_beach_160c3dc8-8dbb-4cee-9114-3d6c468fe6b6-0_2.texts.json';

/**
 * Image of A close-up of a crab on the beach
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfACrabOnTheBeach160c3dc88dbb4cee91143d6c468fe6b60_2_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up of a crab on the beach"
            src="https://cdn.midjourney.com/160c3dc8-8dbb-4cee-9114-3d6c468fe6b6/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpOfACrabOnTheBeach160c3dc88dbb4cee91143d6c468fe6b60_2_Image.metadata = metadata satisfies IWallpaperMetadata;
ACloseUpOfACrabOnTheBeach160c3dc88dbb4cee91143d6c468fe6b60_2_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfACrabOnTheBeach160c3dc88dbb4cee91143d6c468fe6b60_2_Image.texts = texts satisfies IWallpaperTexts;
