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
import colorStats from './Pavol_Hejn_a_pop_art_style_wallpaper_featuring_a_comic_book_sty_193050ed-a99b-41d0-ba68-ba5748c11444-0_0.colors.json';
import metadata from './Pavol_Hejn_a_pop_art_style_wallpaper_featuring_a_comic_book_sty_193050ed-a99b-41d0-ba68-ba5748c11444-0_0.json';
import texts from './Pavol_Hejn_a_pop_art_style_wallpaper_featuring_a_comic_book_sty_193050ed-a99b-41d0-ba68-ba5748c11444-0_0.texts.json';

/**
 * Image of A pop art-style wallpaper featuring a comic book-style illustration of a futuristic robot or cyborg.
 *
 * @see https://www.midjourney.com/app/jobs/0
 * @generated by generate-wallpapers-library
 */
export function APopArtStyleWallpaperFeaturingAComicBookSty193050edA99b41d0Ba68Ba5748c114440_0_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A pop art-style wallpaper featuring a comic book-style illustration of a futuristic robot or cyborg."
            src="https://cdn.midjourney.com/193050ed-a99b-41d0-ba68-ba5748c11444/0_0.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

APopArtStyleWallpaperFeaturingAComicBookSty193050edA99b41d0Ba68Ba5748c114440_0_Image.metadata =
    metadata satisfies IWallpaperMetadata;
APopArtStyleWallpaperFeaturingAComicBookSty193050edA99b41d0Ba68Ba5748c114440_0_Image.colorStats =
    hydrateColorStats(colorStats);
APopArtStyleWallpaperFeaturingAComicBookSty193050edA99b41d0Ba68Ba5748c114440_0_Image.texts =
    texts satisfies IWallpaperTexts;
