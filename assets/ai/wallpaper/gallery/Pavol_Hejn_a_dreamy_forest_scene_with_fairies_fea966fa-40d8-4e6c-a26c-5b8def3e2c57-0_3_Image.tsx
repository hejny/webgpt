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
import colorStats from './Pavol_Hejn_a_dreamy_forest_scene_with_fairies_fea966fa-40d8-4e6c-a26c-5b8def3e2c57-0_3.colors.json';
import metadata from './Pavol_Hejn_a_dreamy_forest_scene_with_fairies_fea966fa-40d8-4e6c-a26c-5b8def3e2c57-0_3.json';
import source from 'https://cdn.midjourney.com/fea966fa-40d8-4e6c-a26c-5b8def3e2c57/0_3.png';
import texts from './Pavol_Hejn_a_dreamy_forest_scene_with_fairies_fea966fa-40d8-4e6c-a26c-5b8def3e2c57-0_3.texts.json';

/**
 * Image of A dreamy forest scene with fairies
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function ADreamyForestSceneWithFairiesFea966fa40d84e6cA26c5b8def3e2c570_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A dreamy forest scene with fairies"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ADreamyForestSceneWithFairiesFea966fa40d84e6cA26c5b8def3e2c570_3_Image.metadata = metadata satisfies IWallpaperMetadata;
ADreamyForestSceneWithFairiesFea966fa40d84e6cA26c5b8def3e2c570_3_Image.colorStats = hydrateColorStats(colorStats);
ADreamyForestSceneWithFairiesFea966fa40d84e6cA26c5b8def3e2c570_3_Image.texts = texts satisfies IWallpaperTexts;
