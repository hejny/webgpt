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
import colorStats from './Pavol_Hejn_an_abstract_illustration_of_a_neural_network_with_in_5247a663-d114-4a23-a02c-63300adeef88-0_1.colors.json';
import metadata from './Pavol_Hejn_an_abstract_illustration_of_a_neural_network_with_in_5247a663-d114-4a23-a02c-63300adeef88-0_1.json';
import source from 'https://cdn.midjourney.com/5247a663-d114-4a23-a02c-63300adeef88/0_1.png';
import texts from './Pavol_Hejn_an_abstract_illustration_of_a_neural_network_with_in_5247a663-d114-4a23-a02c-63300adeef88-0_1.texts.json';

/**
 * Image of An abstract illustration of a neural network, with intricate lines and a dark and technological color palette.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AnAbstractIllustrationOfANeuralNetworkWithIn5247a663D1144a23A02c63300adeef880_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract illustration of a neural network, with intricate lines and a dark and technological color palette."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractIllustrationOfANeuralNetworkWithIn5247a663D1144a23A02c63300adeef880_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractIllustrationOfANeuralNetworkWithIn5247a663D1144a23A02c63300adeef880_1_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractIllustrationOfANeuralNetworkWithIn5247a663D1144a23A02c63300adeef880_1_Image.texts =
    texts satisfies IWallpaperTexts;
