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
import colorStats from './Pavol_Hejn_an_abstract_illustration_of_an_ai_powered_chatbot_wi_cdfd5a3a-1160-47d6-8e4f-64966cd90be8-0_1.colors.json';
import metadata from './Pavol_Hejn_an_abstract_illustration_of_an_ai_powered_chatbot_wi_cdfd5a3a-1160-47d6-8e4f-64966cd90be8-0_1.json';
import texts from './Pavol_Hejn_an_abstract_illustration_of_an_ai_powered_chatbot_wi_cdfd5a3a-1160-47d6-8e4f-64966cd90be8-0_1.texts.json';

/**
 * Image of An abstract illustration of an AI-powered chatbot, with sleek and modern graphics and a minimalist color scheme.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function AnAbstractIllustrationOfAnAiPoweredChatbotWiCdfd5a3a116047d68e4f64966cd90be80_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="An abstract illustration of an AI-powered chatbot, with sleek and modern graphics and a minimalist color scheme."
            src="https://cdn.midjourney.com/cdfd5a3a-1160-47d6-8e4f-64966cd90be8/0_1.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AnAbstractIllustrationOfAnAiPoweredChatbotWiCdfd5a3a116047d68e4f64966cd90be80_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AnAbstractIllustrationOfAnAiPoweredChatbotWiCdfd5a3a116047d68e4f64966cd90be80_1_Image.colorStats =
    hydrateColorStats(colorStats);
AnAbstractIllustrationOfAnAiPoweredChatbotWiCdfd5a3a116047d68e4f64966cd90be80_1_Image.texts =
    texts satisfies IWallpaperTexts;
