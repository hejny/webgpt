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
import colorStats from './Pavol_Hejn_a_digital_landscape_with_geometric_shapes_and_neon_c_90ca310f-a233-4186-86c4-e0f7df2bf098-0_1.colors.json';
import metadata from './Pavol_Hejn_a_digital_landscape_with_geometric_shapes_and_neon_c_90ca310f-a233-4186-86c4-e0f7df2bf098-0_1.json';
import texts from './Pavol_Hejn_a_digital_landscape_with_geometric_shapes_and_neon_c_90ca310f-a233-4186-86c4-e0f7df2bf098-0_1.texts.json';

/**
 * Image of A digital landscape with geometric shapes and neon colors
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function ADigitalLandscapeWithGeometricShapesAndNeonC90ca310fA233418686c4E0f7df2bf0980_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A digital landscape with geometric shapes and neon colors"
            src="https://cdn.midjourney.com/90ca310f-a233-4186-86c4-e0f7df2bf098/0_1.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ADigitalLandscapeWithGeometricShapesAndNeonC90ca310fA233418686c4E0f7df2bf0980_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ADigitalLandscapeWithGeometricShapesAndNeonC90ca310fA233418686c4E0f7df2bf0980_1_Image.colorStats =
    hydrateColorStats(colorStats);
ADigitalLandscapeWithGeometricShapesAndNeonC90ca310fA233418686c4E0f7df2bf0980_1_Image.texts =
    texts satisfies IWallpaperTexts;
