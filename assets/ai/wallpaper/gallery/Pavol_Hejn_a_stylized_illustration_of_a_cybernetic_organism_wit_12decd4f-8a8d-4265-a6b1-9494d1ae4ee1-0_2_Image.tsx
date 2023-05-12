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
import colorStats from './Pavol_Hejn_a_stylized_illustration_of_a_cybernetic_organism_wit_12decd4f-8a8d-4265-a6b1-9494d1ae4ee1-0_2.colors.json';
import metadata from './Pavol_Hejn_a_stylized_illustration_of_a_cybernetic_organism_wit_12decd4f-8a8d-4265-a6b1-9494d1ae4ee1-0_2.json';
import source from 'https://cdn.midjourney.com/12decd4f-8a8d-4265-a6b1-9494d1ae4ee1/0_2.png';
import texts from './Pavol_Hejn_a_stylized_illustration_of_a_cybernetic_organism_wit_12decd4f-8a8d-4265-a6b1-9494d1ae4ee1-0_2.texts.json';

/**
 * Image of A stylized illustration of a cybernetic organism, with metallic textures and digital glitch effects.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AStylizedIllustrationOfACyberneticOrganismWit12decd4f8a8d4265A6b19494d1ae4ee10_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A stylized illustration of a cybernetic organism, with metallic textures and digital glitch effects."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AStylizedIllustrationOfACyberneticOrganismWit12decd4f8a8d4265A6b19494d1ae4ee10_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AStylizedIllustrationOfACyberneticOrganismWit12decd4f8a8d4265A6b19494d1ae4ee10_2_Image.colorStats =
    hydrateColorStats(colorStats);
AStylizedIllustrationOfACyberneticOrganismWit12decd4f8a8d4265A6b19494d1ae4ee10_2_Image.texts =
    texts satisfies IWallpaperTexts;
