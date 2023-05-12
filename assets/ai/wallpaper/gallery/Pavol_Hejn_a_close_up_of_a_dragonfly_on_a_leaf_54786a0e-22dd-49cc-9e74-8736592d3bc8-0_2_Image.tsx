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
import colorStats from './Pavol_Hejn_a_close_up_of_a_dragonfly_on_a_leaf_54786a0e-22dd-49cc-9e74-8736592d3bc8-0_2.colors.json';
import metadata from './Pavol_Hejn_a_close_up_of_a_dragonfly_on_a_leaf_54786a0e-22dd-49cc-9e74-8736592d3bc8-0_2.json';
import source from 'https://cdn.midjourney.com/54786a0e-22dd-49cc-9e74-8736592d3bc8/0_2.png';
import texts from './Pavol_Hejn_a_close_up_of_a_dragonfly_on_a_leaf_54786a0e-22dd-49cc-9e74-8736592d3bc8-0_2.texts.json';

/**
 * Image of A close-up of a dragonfly on a leaf
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function ACloseUpOfADragonflyOnALeaf54786a0e22dd49cc9e748736592d3bc80_2_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A close-up of a dragonfly on a leaf"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACloseUpOfADragonflyOnALeaf54786a0e22dd49cc9e748736592d3bc80_2_Image.metadata = metadata satisfies IWallpaperMetadata;
ACloseUpOfADragonflyOnALeaf54786a0e22dd49cc9e748736592d3bc80_2_Image.colorStats = hydrateColorStats(colorStats);
ACloseUpOfADragonflyOnALeaf54786a0e22dd49cc9e748736592d3bc80_2_Image.texts = texts satisfies IWallpaperTexts;
