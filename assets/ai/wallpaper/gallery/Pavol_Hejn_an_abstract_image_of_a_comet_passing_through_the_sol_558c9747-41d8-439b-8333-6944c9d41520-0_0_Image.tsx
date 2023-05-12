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
import colorStats from './Pavol_Hejn_an_abstract_image_of_a_comet_passing_through_the_sol_558c9747-41d8-439b-8333-6944c9d41520-0_0.colors.json';
import metadata from './Pavol_Hejn_an_abstract_image_of_a_comet_passing_through_the_sol_558c9747-41d8-439b-8333-6944c9d41520-0_0.json';
import source from 'https://cdn.midjourney.com/558c9747-41d8-439b-8333-6944c9d41520/0_0.png';
import texts from './Pavol_Hejn_an_abstract_image_of_a_comet_passing_through_the_sol_558c9747-41d8-439b-8333-6944c9d41520-0_0.texts.json';

/**
 * Image of An abstract image of a comet passing through the solar system, with bright colors and swirling patterns that represent its trajectory.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AnAbstractImageOfACometPassingThroughTheSol558c974741d8439b83336944c9d415200_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract image of a comet passing through the solar system, with bright colors and swirling patterns that represent its trajectory."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractImageOfACometPassingThroughTheSol558c974741d8439b83336944c9d415200_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractImageOfACometPassingThroughTheSol558c974741d8439b83336944c9d415200_0_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractImageOfACometPassingThroughTheSol558c974741d8439b83336944c9d415200_0_Image.texts =
    texts satisfies IWallpaperTexts;
