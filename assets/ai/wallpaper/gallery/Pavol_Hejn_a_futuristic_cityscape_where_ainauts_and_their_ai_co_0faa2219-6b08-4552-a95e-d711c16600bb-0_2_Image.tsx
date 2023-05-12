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
import colorStats from './Pavol_Hejn_a_futuristic_cityscape_where_ainauts_and_their_ai_co_0faa2219-6b08-4552-a95e-d711c16600bb-0_2.colors.json';
import metadata from './Pavol_Hejn_a_futuristic_cityscape_where_ainauts_and_their_ai_co_0faa2219-6b08-4552-a95e-d711c16600bb-0_2.json';
import texts from './Pavol_Hejn_a_futuristic_cityscape_where_ainauts_and_their_ai_co_0faa2219-6b08-4552-a95e-d711c16600bb-0_2.texts.json';

/**
 * Image of A futuristic cityscape where AInauts and their AI counterparts work together to build towering skyscrapers and infrastructure.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AFuturisticCityscapeWhereAinautsAndTheirAiCo0faa22196b084552A95eD711c16600bb0_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A futuristic cityscape where AInauts and their AI counterparts work together to build towering skyscrapers and infrastructure."
            src="https://cdn.midjourney.com/0faa2219-6b08-4552-a95e-d711c16600bb/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AFuturisticCityscapeWhereAinautsAndTheirAiCo0faa22196b084552A95eD711c16600bb0_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AFuturisticCityscapeWhereAinautsAndTheirAiCo0faa22196b084552A95eD711c16600bb0_2_Image.colorStats =
    hydrateColorStats(colorStats);
AFuturisticCityscapeWhereAinautsAndTheirAiCo0faa22196b084552A95eD711c16600bb0_2_Image.texts =
    texts satisfies IWallpaperTexts;
