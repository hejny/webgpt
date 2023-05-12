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
import colorStats from './Pavol_Hejn_a_csg_style_rendering_of_an_alien_landscape_with_sha_8332870a-1c25-4ec7-b979-849e4fac6c67-0_1.colors.json';
import metadata from './Pavol_Hejn_a_csg_style_rendering_of_an_alien_landscape_with_sha_8332870a-1c25-4ec7-b979-849e4fac6c67-0_1.json';
import source from 'https://cdn.midjourney.com/8332870a-1c25-4ec7-b979-849e4fac6c67/0_1.png';
import texts from './Pavol_Hejn_a_csg_style_rendering_of_an_alien_landscape_with_sha_8332870a-1c25-4ec7-b979-849e4fac6c67-0_1.texts.json';

/**
 * Image of A csg-style rendering of an alien landscape, with sharp angles and contrasting colors that create a futuristic and industrial vibe.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ACsgStyleRenderingOfAnAlienLandscapeWithSha8332870a1c254ec7B979849e4fac6c670_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A csg-style rendering of an alien landscape, with sharp angles and contrasting colors that create a futuristic and industrial vibe."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACsgStyleRenderingOfAnAlienLandscapeWithSha8332870a1c254ec7B979849e4fac6c670_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ACsgStyleRenderingOfAnAlienLandscapeWithSha8332870a1c254ec7B979849e4fac6c670_1_Image.colorStats =
    hydrateColorStats(colorStats);
ACsgStyleRenderingOfAnAlienLandscapeWithSha8332870a1c254ec7B979849e4fac6c670_1_Image.texts =
    texts satisfies IWallpaperTexts;
