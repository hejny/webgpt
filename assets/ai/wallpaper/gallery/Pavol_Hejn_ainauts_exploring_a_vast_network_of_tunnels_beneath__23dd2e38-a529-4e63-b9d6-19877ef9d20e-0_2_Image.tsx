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
import colorStats from './Pavol_Hejn_ainauts_exploring_a_vast_network_of_tunnels_beneath__23dd2e38-a529-4e63-b9d6-19877ef9d20e-0_2.colors.json';
import metadata from './Pavol_Hejn_ainauts_exploring_a_vast_network_of_tunnels_beneath__23dd2e38-a529-4e63-b9d6-19877ef9d20e-0_2.json';
import texts from './Pavol_Hejn_ainauts_exploring_a_vast_network_of_tunnels_beneath__23dd2e38-a529-4e63-b9d6-19877ef9d20e-0_2.texts.json';

/**
 * Image of AInauts exploring a vast network of tunnels beneath the surface of a distant planet, with glowing crystals all around them.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function AinautsExploringAVastNetworkOfTunnelsBeneath3dd2e38A5294e63B9d619877ef9d20e02_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="AInauts exploring a vast network of tunnels beneath the surface of a distant planet, with glowing crystals all around them."
            src="https://cdn.midjourney.com/23dd2e38-a529-4e63-b9d6-19877ef9d20e/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AinautsExploringAVastNetworkOfTunnelsBeneath3dd2e38A5294e63B9d619877ef9d20e02_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AinautsExploringAVastNetworkOfTunnelsBeneath3dd2e38A5294e63B9d619877ef9d20e02_2_Image.colorStats =
    hydrateColorStats(colorStats);
AinautsExploringAVastNetworkOfTunnelsBeneath3dd2e38A5294e63B9d619877ef9d20e02_2_Image.texts =
    texts satisfies IWallpaperTexts;
