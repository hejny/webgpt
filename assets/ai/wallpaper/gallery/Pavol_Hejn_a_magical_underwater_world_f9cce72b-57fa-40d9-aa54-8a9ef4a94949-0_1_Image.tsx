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
import colorStats from './Pavol_Hejn_a_magical_underwater_world_f9cce72b-57fa-40d9-aa54-8a9ef4a94949-0_1.colors.json';
import metadata from './Pavol_Hejn_a_magical_underwater_world_f9cce72b-57fa-40d9-aa54-8a9ef4a94949-0_1.json';
import source from 'https://cdn.midjourney.com/f9cce72b-57fa-40d9-aa54-8a9ef4a94949/0_1.png';
import texts from './Pavol_Hejn_a_magical_underwater_world_f9cce72b-57fa-40d9-aa54-8a9ef4a94949-0_1.texts.json';

/**
 * Image of A magical underwater world
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AMagicalUnderwaterWorldF9cce72b57fa40d9Aa548a9ef4a949490_1_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A magical underwater world"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AMagicalUnderwaterWorldF9cce72b57fa40d9Aa548a9ef4a949490_1_Image.metadata = metadata satisfies IWallpaperMetadata;
AMagicalUnderwaterWorldF9cce72b57fa40d9Aa548a9ef4a949490_1_Image.colorStats = hydrateColorStats(colorStats);
AMagicalUnderwaterWorldF9cce72b57fa40d9Aa548a9ef4a949490_1_Image.texts = texts satisfies IWallpaperTexts;
