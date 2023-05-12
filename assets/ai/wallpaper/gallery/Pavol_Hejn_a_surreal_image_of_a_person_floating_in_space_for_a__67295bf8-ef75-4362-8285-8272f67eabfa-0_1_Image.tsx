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
import colorStats from './Pavol_Hejn_a_surreal_image_of_a_person_floating_in_space_for_a__67295bf8-ef75-4362-8285-8272f67eabfa-0_1.colors.json';
import metadata from './Pavol_Hejn_a_surreal_image_of_a_person_floating_in_space_for_a__67295bf8-ef75-4362-8285-8272f67eabfa-0_1.json';
import texts from './Pavol_Hejn_a_surreal_image_of_a_person_floating_in_space_for_a__67295bf8-ef75-4362-8285-8272f67eabfa-0_1.texts.json';

/**
 * Image of A surreal image of a person floating in space for a spirituality or personal growth website
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ASurrealImageOfAPersonFloatingInSpaceForA67295bf8Ef75436282858272f67eabfa0_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A surreal image of a person floating in space for a spirituality or personal growth website"
            src="https://cdn.midjourney.com/67295bf8-ef75-4362-8285-8272f67eabfa/0_1.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ASurrealImageOfAPersonFloatingInSpaceForA67295bf8Ef75436282858272f67eabfa0_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ASurrealImageOfAPersonFloatingInSpaceForA67295bf8Ef75436282858272f67eabfa0_1_Image.colorStats =
    hydrateColorStats(colorStats);
ASurrealImageOfAPersonFloatingInSpaceForA67295bf8Ef75436282858272f67eabfa0_1_Image.texts =
    texts satisfies IWallpaperTexts;
