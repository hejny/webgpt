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
import colorStats from './Pavol_Hejn_a_close_up_of_a_cat_s_eye_e46986f0-450a-4215-8a2b-593084360fb8-0_2.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_a_cat_s_eye_e46986f0-450a-4215-8a2b-593084360fb8-0_2.json';
import texts from './Pavol_Hejn_a_close_up_of_a_cat_s_eye_e46986f0-450a-4215-8a2b-593084360fb8-0_2.texts.json';

/**
 * Image of A close-up of a cat’s eye
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfACatSEyeE46986f0450a42158a2b593084360fb80_2_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up of a cat’s eye"
            src="https://cdn.midjourney.com/e46986f0-450a-4215-8a2b-593084360fb8/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpOfACatSEyeE46986f0450a42158a2b593084360fb80_2_Image.metadata = metadata satisfies IWallpaperMetadata;
ACloseUpOfACatSEyeE46986f0450a42158a2b593084360fb80_2_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfACatSEyeE46986f0450a42158a2b593084360fb80_2_Image.texts = texts satisfies IWallpaperTexts;
