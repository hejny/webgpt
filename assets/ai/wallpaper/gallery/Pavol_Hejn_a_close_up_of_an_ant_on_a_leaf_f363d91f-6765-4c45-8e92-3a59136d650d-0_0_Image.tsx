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
import colorStats from './Pavol_Hejn_a_close_up_of_an_ant_on_a_leaf_f363d91f-6765-4c45-8e92-3a59136d650d-0_0.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_an_ant_on_a_leaf_f363d91f-6765-4c45-8e92-3a59136d650d-0_0.json';
import source from 'https://cdn.midjourney.com/f363d91f-6765-4c45-8e92-3a59136d650d/0_0.png';
import texts from './Pavol_Hejn_a_close_up_of_an_ant_on_a_leaf_f363d91f-6765-4c45-8e92-3a59136d650d-0_0.texts.json';

/**
 * Image of A close-up of an ant on a leaf
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfAnAntOnALeafF363d91f67654c458e923a59136d650d0_0_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up of an ant on a leaf"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpOfAnAntOnALeafF363d91f67654c458e923a59136d650d0_0_Image.metadata = metadata satisfies IWallpaperMetadata;
ACloseUpOfAnAntOnALeafF363d91f67654c458e923a59136d650d0_0_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfAnAntOnALeafF363d91f67654c458e923a59136d650d0_0_Image.texts = texts satisfies IWallpaperTexts;
