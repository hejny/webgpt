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
import colorStats from './Pavol_Hejn_a_surreal_interpretation_of_a_desert_landscape_df2bc40a-b36b-4e8b-bd85-08b645af1218-0_0.colors.json';
import metadata from './Pavol_Hejn_a_surreal_interpretation_of_a_desert_landscape_df2bc40a-b36b-4e8b-bd85-08b645af1218-0_0.json';
import texts from './Pavol_Hejn_a_surreal_interpretation_of_a_desert_landscape_df2bc40a-b36b-4e8b-bd85-08b645af1218-0_0.texts.json';

/**
 * Image of A surreal interpretation of a desert landscape
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ASurrealInterpretationOfADesertLandscapeDf2bc40aB36b4e8bBd8508b645af12180_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A surreal interpretation of a desert landscape"
            src="https://cdn.midjourney.com/df2bc40a-b36b-4e8b-bd85-08b645af1218/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ASurrealInterpretationOfADesertLandscapeDf2bc40aB36b4e8bBd8508b645af12180_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ASurrealInterpretationOfADesertLandscapeDf2bc40aB36b4e8bBd8508b645af12180_0_Image.colorStats =
    hydrateColorStats(colorStats);
ASurrealInterpretationOfADesertLandscapeDf2bc40aB36b4e8bBd8508b645af12180_0_Image.texts =
    texts satisfies IWallpaperTexts;
