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
import colorStats from './Pavol_Hejn_a_group_of_ainauts_standing_on_the_surface_of_a_dist_18cbb55a-e7c0-4c6b-a000-6424894ddfd7-0_1.colors.json';
import metadata from './Pavol_Hejn_a_group_of_ainauts_standing_on_the_surface_of_a_dist_18cbb55a-e7c0-4c6b-a000-6424894ddfd7-0_1.json';
import texts from './Pavol_Hejn_a_group_of_ainauts_standing_on_the_surface_of_a_dist_18cbb55a-e7c0-4c6b-a000-6424894ddfd7-0_1.texts.json';

/**
 * Image of A group of AInauts standing on the surface of a distant planet, looking up at a massive, alien structure looming in the distance.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AGroupOfAinautsStandingOnTheSurfaceOfADist8cbb55aE7c04c6bA0006424894ddfd701_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A group of AInauts standing on the surface of a distant planet, looking up at a massive, alien structure looming in the distance."
            src="https://cdn.midjourney.com/18cbb55a-e7c0-4c6b-a000-6424894ddfd7/0_1.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AGroupOfAinautsStandingOnTheSurfaceOfADist8cbb55aE7c04c6bA0006424894ddfd701_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AGroupOfAinautsStandingOnTheSurfaceOfADist8cbb55aE7c04c6bA0006424894ddfd701_1_Image.colorStats =
    hydrateColorStats(colorStats);
AGroupOfAinautsStandingOnTheSurfaceOfADist8cbb55aE7c04c6bA0006424894ddfd701_1_Image.texts =
    texts satisfies IWallpaperTexts;
