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
import colorStats from './Pavol_Hejn_a_photograph_of_an_iceberg_in_the_arctic_with_the_bl_1c1c3cf1-8fca-4598-805b-0ff63df767ea-0_3.colors.json';
import metadata from './Pavol_Hejn_a_photograph_of_an_iceberg_in_the_arctic_with_the_bl_1c1c3cf1-8fca-4598-805b-0ff63df767ea-0_3.json';
import source from 'https://cdn.midjourney.com/1c1c3cf1-8fca-4598-805b-0ff63df767ea/0_3.png';
import texts from './Pavol_Hejn_a_photograph_of_an_iceberg_in_the_arctic_with_the_bl_1c1c3cf1-8fca-4598-805b-0ff63df767ea-0_3.texts.json';

/**
 * Image of A photograph of an iceberg in the Arctic, with the blue and white colors contrasting against a dark sky.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function APhotographOfAnIcebergInTheArcticWithTheBl1c1c3cf18fca4598805b0ff63df767ea0_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A photograph of an iceberg in the Arctic, with the blue and white colors contrasting against a dark sky."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

APhotographOfAnIcebergInTheArcticWithTheBl1c1c3cf18fca4598805b0ff63df767ea0_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
APhotographOfAnIcebergInTheArcticWithTheBl1c1c3cf18fca4598805b0ff63df767ea0_3_Image.colorStats =
    hydrateColorStats(colorStats);
APhotographOfAnIcebergInTheArcticWithTheBl1c1c3cf18fca4598805b0ff63df767ea0_3_Image.texts =
    texts satisfies IWallpaperTexts;
