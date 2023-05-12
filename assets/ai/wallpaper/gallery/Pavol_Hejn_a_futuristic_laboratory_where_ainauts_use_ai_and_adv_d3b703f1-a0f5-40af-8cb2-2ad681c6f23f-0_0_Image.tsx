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
import colorStats from './Pavol_Hejn_a_futuristic_laboratory_where_ainauts_use_ai_and_adv_d3b703f1-a0f5-40af-8cb2-2ad681c6f23f-0_0.colors.json';
import metadata from './Pavol_Hejn_a_futuristic_laboratory_where_ainauts_use_ai_and_adv_d3b703f1-a0f5-40af-8cb2-2ad681c6f23f-0_0.json';
import texts from './Pavol_Hejn_a_futuristic_laboratory_where_ainauts_use_ai_and_adv_d3b703f1-a0f5-40af-8cb2-2ad681c6f23f-0_0.texts.json';

/**
 * Image of A futuristic laboratory where AInauts use AI and advanced technology to create new forms of life.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AFuturisticLaboratoryWhereAinautsUseAiAndAdvD3b703f1A0f540af8cb22ad681c6f23f0_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A futuristic laboratory where AInauts use AI and advanced technology to create new forms of life."
            src="https://cdn.midjourney.com/d3b703f1-a0f5-40af-8cb2-2ad681c6f23f/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AFuturisticLaboratoryWhereAinautsUseAiAndAdvD3b703f1A0f540af8cb22ad681c6f23f0_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AFuturisticLaboratoryWhereAinautsUseAiAndAdvD3b703f1A0f540af8cb22ad681c6f23f0_0_Image.colorStats =
    hydrateColorStats(colorStats);
AFuturisticLaboratoryWhereAinautsUseAiAndAdvD3b703f1A0f540af8cb22ad681c6f23f0_0_Image.texts =
    texts satisfies IWallpaperTexts;
