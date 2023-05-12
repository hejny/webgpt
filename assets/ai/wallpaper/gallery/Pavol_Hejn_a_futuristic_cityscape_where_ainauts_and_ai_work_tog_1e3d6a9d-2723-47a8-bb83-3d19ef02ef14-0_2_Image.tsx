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
import colorStats from './Pavol_Hejn_a_futuristic_cityscape_where_ainauts_and_ai_work_tog_1e3d6a9d-2723-47a8-bb83-3d19ef02ef14-0_2.colors.json';
import metadata from './Pavol_Hejn_a_futuristic_cityscape_where_ainauts_and_ai_work_tog_1e3d6a9d-2723-47a8-bb83-3d19ef02ef14-0_2.json';
import texts from './Pavol_Hejn_a_futuristic_cityscape_where_ainauts_and_ai_work_tog_1e3d6a9d-2723-47a8-bb83-3d19ef02ef14-0_2.texts.json';

/**
 * Image of A futuristic cityscape where AInauts and AI work together to create massive, sustainable structures and infrastructure.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AFuturisticCityscapeWhereAinautsAndAiWorkTog1e3d6a9d272347a8Bb833d19ef02ef140_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A futuristic cityscape where AInauts and AI work together to create massive, sustainable structures and infrastructure."
            src="https://cdn.midjourney.com/1e3d6a9d-2723-47a8-bb83-3d19ef02ef14/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AFuturisticCityscapeWhereAinautsAndAiWorkTog1e3d6a9d272347a8Bb833d19ef02ef140_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AFuturisticCityscapeWhereAinautsAndAiWorkTog1e3d6a9d272347a8Bb833d19ef02ef140_2_Image.colorStats =
    hydrateColorStats(colorStats);
AFuturisticCityscapeWhereAinautsAndAiWorkTog1e3d6a9d272347a8Bb833d19ef02ef140_2_Image.texts =
    texts satisfies IWallpaperTexts;
