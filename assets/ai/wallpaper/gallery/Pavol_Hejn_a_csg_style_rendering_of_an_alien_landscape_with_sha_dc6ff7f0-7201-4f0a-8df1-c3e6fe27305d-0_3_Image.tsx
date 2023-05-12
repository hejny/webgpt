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
import colorStats from './Pavol_Hejn_a_csg_style_rendering_of_an_alien_landscape_with_sha_dc6ff7f0-7201-4f0a-8df1-c3e6fe27305d-0_3.colors.json';
import metadata from './Pavol_Hejn_a_csg_style_rendering_of_an_alien_landscape_with_sha_dc6ff7f0-7201-4f0a-8df1-c3e6fe27305d-0_3.json';
import source from 'https://cdn.midjourney.com/dc6ff7f0-7201-4f0a-8df1-c3e6fe27305d/0_3.png';
import texts from './Pavol_Hejn_a_csg_style_rendering_of_an_alien_landscape_with_sha_dc6ff7f0-7201-4f0a-8df1-c3e6fe27305d-0_3.texts.json';

/**
 * Image of A csg-style rendering of an alien landscape, with sharp angles and contrasting colors that create a futuristic and industrial vibe.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ACsgStyleRenderingOfAnAlienLandscapeWithShaDc6ff7f072014f0a8df1C3e6fe27305d0_3_Image(
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

ACsgStyleRenderingOfAnAlienLandscapeWithShaDc6ff7f072014f0a8df1C3e6fe27305d0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ACsgStyleRenderingOfAnAlienLandscapeWithShaDc6ff7f072014f0a8df1C3e6fe27305d0_3_Image.colorStats =
    hydrateColorStats(colorStats);
ACsgStyleRenderingOfAnAlienLandscapeWithShaDc6ff7f072014f0a8df1C3e6fe27305d0_3_Image.texts =
    texts satisfies IWallpaperTexts;
