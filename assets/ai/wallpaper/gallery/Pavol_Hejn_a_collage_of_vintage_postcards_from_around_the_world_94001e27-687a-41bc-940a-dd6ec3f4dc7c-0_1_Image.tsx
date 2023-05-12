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
import colorStats from './Pavol_Hejn_a_collage_of_vintage_postcards_from_around_the_world_94001e27-687a-41bc-940a-dd6ec3f4dc7c-0_1.colors.json';
import metadata from './Pavol_Hejn_a_collage_of_vintage_postcards_from_around_the_world_94001e27-687a-41bc-940a-dd6ec3f4dc7c-0_1.json';
import source from 'https://cdn.midjourney.com/94001e27-687a-41bc-940a-dd6ec3f4dc7c/0_1.png';
import texts from './Pavol_Hejn_a_collage_of_vintage_postcards_from_around_the_world_94001e27-687a-41bc-940a-dd6ec3f4dc7c-0_1.texts.json';

/**
 * Image of A collage of vintage postcards from around the world
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ACollageOfVintagePostcardsFromAroundTheWorld94001e27687a41bc940aDd6ec3f4dc7c0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A collage of vintage postcards from around the world"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACollageOfVintagePostcardsFromAroundTheWorld94001e27687a41bc940aDd6ec3f4dc7c0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ACollageOfVintagePostcardsFromAroundTheWorld94001e27687a41bc940aDd6ec3f4dc7c0_1_Image.colorStats =
    hydrateColorStats(colorStats);
ACollageOfVintagePostcardsFromAroundTheWorld94001e27687a41bc940aDd6ec3f4dc7c0_1_Image.texts =
    texts satisfies IWallpaperTexts;
