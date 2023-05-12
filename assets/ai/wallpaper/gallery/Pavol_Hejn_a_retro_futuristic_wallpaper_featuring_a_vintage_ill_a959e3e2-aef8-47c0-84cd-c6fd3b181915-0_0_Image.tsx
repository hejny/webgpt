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
import colorStats from './Pavol_Hejn_a_retro_futuristic_wallpaper_featuring_a_vintage_ill_a959e3e2-aef8-47c0-84cd-c6fd3b181915-0_0.colors.json';
import metadata from './Pavol_Hejn_a_retro_futuristic_wallpaper_featuring_a_vintage_ill_a959e3e2-aef8-47c0-84cd-c6fd3b181915-0_0.json';
import texts from './Pavol_Hejn_a_retro_futuristic_wallpaper_featuring_a_vintage_ill_a959e3e2-aef8-47c0-84cd-c6fd3b181915-0_0.texts.json';

/**
 * Image of A retro-futuristic wallpaper featuring a vintage illustration of a robot, set against a neon-colored background.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function ARetroFuturisticWallpaperFeaturingAVintageIllA959e3e2Aef847c084cdC6fd3b1819150_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A retro-futuristic wallpaper featuring a vintage illustration of a robot, set against a neon-colored background."
            src="https://cdn.midjourney.com/a959e3e2-aef8-47c0-84cd-c6fd3b181915/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

ARetroFuturisticWallpaperFeaturingAVintageIllA959e3e2Aef847c084cdC6fd3b1819150_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
ARetroFuturisticWallpaperFeaturingAVintageIllA959e3e2Aef847c084cdC6fd3b1819150_0_Image.colorStats =
    hydrateColorStats(colorStats);
ARetroFuturisticWallpaperFeaturingAVintageIllA959e3e2Aef847c084cdC6fd3b1819150_0_Image.texts =
    texts satisfies IWallpaperTexts;
