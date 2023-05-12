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
import colorStats from './Pavol_Hejn_a_surreal_image_of_a_person_floating_among_the_cloud_bfbd1ebf-bf6b-4323-95eb-b078f8ad819f-0_1.colors.json';
import metadata from './Pavol_Hejn_a_surreal_image_of_a_person_floating_among_the_cloud_bfbd1ebf-bf6b-4323-95eb-b078f8ad819f-0_1.json';
import source from 'https://cdn.midjourney.com/bfbd1ebf-bf6b-4323-95eb-b078f8ad819f/0_1.png';
import texts from './Pavol_Hejn_a_surreal_image_of_a_person_floating_among_the_cloud_bfbd1ebf-bf6b-4323-95eb-b078f8ad819f-0_1.texts.json';

/**
 * Image of A surreal image of a person floating among the clouds for a spirituality or personal growth website
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ASurrealImageOfAPersonFloatingAmongTheCloudBfbd1ebfBf6b432395ebB078f8ad819f0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A surreal image of a person floating among the clouds for a spirituality or personal growth website"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ASurrealImageOfAPersonFloatingAmongTheCloudBfbd1ebfBf6b432395ebB078f8ad819f0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ASurrealImageOfAPersonFloatingAmongTheCloudBfbd1ebfBf6b432395ebB078f8ad819f0_1_Image.colorStats =
    hydrateColorStats(colorStats);
ASurrealImageOfAPersonFloatingAmongTheCloudBfbd1ebfBf6b432395ebB078f8ad819f0_1_Image.texts =
    texts satisfies IWallpaperTexts;
