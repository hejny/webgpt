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
import colorStats from './Pavol_Hejn_a_cityscape_overtaken_by_nature_218140d9-7328-4a5d-8f32-8df907313fd5-0_1.colors.json';
import metadata from './Pavol_Hejn_a_cityscape_overtaken_by_nature_218140d9-7328-4a5d-8f32-8df907313fd5-0_1.json';
import texts from './Pavol_Hejn_a_cityscape_overtaken_by_nature_218140d9-7328-4a5d-8f32-8df907313fd5-0_1.texts.json';

/**
 * Image of A cityscape overtaken by nature
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ACityscapeOvertakenByNature218140d973284a5d8f328df907313fd50_1_Image(props: IWallpaperComponentProps) {
    const { width, quality } = props;

    return (
        <Image
            alt="A cityscape overtaken by nature"
            src="https://cdn.midjourney.com/218140d9-7328-4a5d-8f32-8df907313fd5/0_1.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ACityscapeOvertakenByNature218140d973284a5d8f328df907313fd50_1_Image.metadata = metadata satisfies IWallpaperMetadata;
ACityscapeOvertakenByNature218140d973284a5d8f328df907313fd50_1_Image.colorStats = hydrateColorStats(colorStats);
ACityscapeOvertakenByNature218140d973284a5d8f328df907313fd50_1_Image.texts = texts satisfies IWallpaperTexts;
