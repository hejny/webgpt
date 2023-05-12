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
import colorStats from './Pavol_Hejn_a_surreal_image_of_a_person_walking_on_a_tightrope_f_9d743a4d-fe93-4bed-b9cb-db37f0a345dd-0_1.colors.json';
import metadata from './Pavol_Hejn_a_surreal_image_of_a_person_walking_on_a_tightrope_f_9d743a4d-fe93-4bed-b9cb-db37f0a345dd-0_1.json';
import source from 'https://cdn.midjourney.com/9d743a4d-fe93-4bed-b9cb-db37f0a345dd/0_1.png';
import texts from './Pavol_Hejn_a_surreal_image_of_a_person_walking_on_a_tightrope_f_9d743a4d-fe93-4bed-b9cb-db37f0a345dd-0_1.texts.json';

/**
 * Image of A surreal image of a person walking on a tightrope for a motivational or personal development website
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ASurrealImageOfAPersonWalkingOnATightropeF9d743a4dFe934bedB9cbDb37f0a345dd0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A surreal image of a person walking on a tightrope for a motivational or personal development website"
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ASurrealImageOfAPersonWalkingOnATightropeF9d743a4dFe934bedB9cbDb37f0a345dd0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ASurrealImageOfAPersonWalkingOnATightropeF9d743a4dFe934bedB9cbDb37f0a345dd0_1_Image.colorStats =
    hydrateColorStats(colorStats);
ASurrealImageOfAPersonWalkingOnATightropeF9d743a4dFe934bedB9cbDb37f0a345dd0_1_Image.texts =
    texts satisfies IWallpaperTexts;
