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
import colorStats from './Pavol_Hejn_an_abstract_representation_of_the_inside_of_a_comput_fd6ceb52-cea8-41fd-a221-fcbde3192db1-0_3.colors.json';
import metadata from './Pavol_Hejn_an_abstract_representation_of_the_inside_of_a_comput_fd6ceb52-cea8-41fd-a221-fcbde3192db1-0_3.json';
import texts from './Pavol_Hejn_an_abstract_representation_of_the_inside_of_a_comput_fd6ceb52-cea8-41fd-a221-fcbde3192db1-0_3.texts.json';

/**
 * Image of An abstract representation of the inside of a computer chip with a metallic color palette
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AnAbstractRepresentationOfTheInsideOfAComputFd6ceb52Cea841fdA221Fcbde3192db10_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract representation of the inside of a computer chip with a metallic color palette"
            src="https://cdn.midjourney.com/fd6ceb52-cea8-41fd-a221-fcbde3192db1/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractRepresentationOfTheInsideOfAComputFd6ceb52Cea841fdA221Fcbde3192db10_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractRepresentationOfTheInsideOfAComputFd6ceb52Cea841fdA221Fcbde3192db10_3_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractRepresentationOfTheInsideOfAComputFd6ceb52Cea841fdA221Fcbde3192db10_3_Image.texts =
    texts satisfies IWallpaperTexts;
