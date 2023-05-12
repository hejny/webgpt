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
import colorStats from './Pavol_Hejn_a_wallpaper_with_a_graph_of_data_visualization_in_a__1b712b9f-b605-4aea-a6db-cdd2b5ed08c9-0_0.colors.json';
import metadata from './Pavol_Hejn_a_wallpaper_with_a_graph_of_data_visualization_in_a__1b712b9f-b605-4aea-a6db-cdd2b5ed08c9-0_0.json';
import source from 'https://cdn.midjourney.com/1b712b9f-b605-4aea-a6db-cdd2b5ed08c9/0_0.png';
import texts from './Pavol_Hejn_a_wallpaper_with_a_graph_of_data_visualization_in_a__1b712b9f-b605-4aea-a6db-cdd2b5ed08c9-0_0.texts.json';

/**
 * Image of A wallpaper with a graph of data visualization, in a minimalist and modern design.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function AWallpaperWithAGraphOfDataVisualizationInA1b712b9fB6054aeaA6dbCdd2b5ed08c90_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A wallpaper with a graph of data visualization, in a minimalist and modern design."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AWallpaperWithAGraphOfDataVisualizationInA1b712b9fB6054aeaA6dbCdd2b5ed08c90_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AWallpaperWithAGraphOfDataVisualizationInA1b712b9fB6054aeaA6dbCdd2b5ed08c90_0_Image.colorStats =
    hydrateColorStats(colorStats);
AWallpaperWithAGraphOfDataVisualizationInA1b712b9fB6054aeaA6dbCdd2b5ed08c90_0_Image.texts =
    texts satisfies IWallpaperTexts;
