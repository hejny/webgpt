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
import colorStats from './Pavol_Hejn_a_pop_art_style_wallpaper_featuring_a_comic_book_sty_193050ed-a99b-41d0-ba68-ba5748c11444-0_1.colors.json';
import metadata from './Pavol_Hejn_a_pop_art_style_wallpaper_featuring_a_comic_book_sty_193050ed-a99b-41d0-ba68-ba5748c11444-0_1.json';
import source from 'https://cdn.midjourney.com/193050ed-a99b-41d0-ba68-ba5748c11444/0_1.png';
import texts from './Pavol_Hejn_a_pop_art_style_wallpaper_featuring_a_comic_book_sty_193050ed-a99b-41d0-ba68-ba5748c11444-0_1.texts.json';

/**
 * Image of A pop art-style wallpaper featuring a comic book-style illustration of a futuristic robot or cyborg.
 *
 * @see https://www.midjourney.com/app/jobs/1
 * @generated by generate-wallpapers-library
 */
export function APopArtStyleWallpaperFeaturingAComicBookSty93050edA99b41d0Ba68Ba5748c1144401_1_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A pop art-style wallpaper featuring a comic book-style illustration of a futuristic robot or cyborg."
            src={source}
            draggable="false"
            placeholder="blur"
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

APopArtStyleWallpaperFeaturingAComicBookSty93050edA99b41d0Ba68Ba5748c1144401_1_Image.metadata =
    metadata satisfies IWallpaperMetadata;
APopArtStyleWallpaperFeaturingAComicBookSty93050edA99b41d0Ba68Ba5748c1144401_1_Image.colorStats =
    hydrateColorStats(colorStats);
APopArtStyleWallpaperFeaturingAComicBookSty93050edA99b41d0Ba68Ba5748c1144401_1_Image.texts =
    texts satisfies IWallpaperTexts;
