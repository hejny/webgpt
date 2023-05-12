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
import colorStats from './Pavol_Hejn_a_photograph_of_an_astronaut_standing_on_the_surface_68938bae-be07-4109-aa15-80a8f6bf1505-0_2.colors.json';
import metadata from './Pavol_Hejn_a_photograph_of_an_astronaut_standing_on_the_surface_68938bae-be07-4109-aa15-80a8f6bf1505-0_2.json';
import texts from './Pavol_Hejn_a_photograph_of_an_astronaut_standing_on_the_surface_68938bae-be07-4109-aa15-80a8f6bf1505-0_2.texts.json';

/**
 * Image of A photograph of an astronaut standing on the surface of the moon with Earth in the background.
 *
 * @see https://www.midjourney.com/app/jobs/2
 * @generated by generate-wallpapers-library
 */
export function APhotographOfAnAstronautStandingOnTheSurface68938baeBe074109Aa1580a8f6bf15050_2_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A photograph of an astronaut standing on the surface of the moon with Earth in the background."
            src="https://cdn.midjourney.com/68938bae-be07-4109-aa15-80a8f6bf1505/0_2.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

APhotographOfAnAstronautStandingOnTheSurface68938baeBe074109Aa1580a8f6bf15050_2_Image.metadata =
    metadata satisfies IWallpaperMetadata;
APhotographOfAnAstronautStandingOnTheSurface68938baeBe074109Aa1580a8f6bf15050_2_Image.colorStats =
    hydrateColorStats(colorStats);
APhotographOfAnAstronautStandingOnTheSurface68938baeBe074109Aa1580a8f6bf15050_2_Image.texts =
    texts satisfies IWallpaperTexts;
