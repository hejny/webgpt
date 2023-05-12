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
import colorStats from './Pavol_Hejn_a_vintage_map_of_the_stars_and_constellations_with_d_a8587861-961f-4ac0-b6c1-4b84cb239531-0_3.colors.json';
import metadata from './Pavol_Hejn_a_vintage_map_of_the_stars_and_constellations_with_d_a8587861-961f-4ac0-b6c1-4b84cb239531-0_3.json';
import texts from './Pavol_Hejn_a_vintage_map_of_the_stars_and_constellations_with_d_a8587861-961f-4ac0-b6c1-4b84cb239531-0_3.texts.json';

/**
 * Image of A vintage map of the stars and constellations, with detailed illustrations of spacecraft and celestial bodies.
 *
 * @see https://www.midjourney.com/app/jobs/3
 * @generated by generate-wallpapers-library
 */
export function AVintageMapOfTheStarsAndConstellationsWithDA8587861961f4ac0B6c14b84cb2395310_3_Image(
    props: IWallpaperComponentProps,
) {
    const { width, quality } = props;

    return (
        <Image
            alt="A vintage map of the stars and constellations, with detailed illustrations of spacecraft and celestial bodies."
            src="https://cdn.midjourney.com/a8587861-961f-4ac0-b6c1-4b84cb239531/0_3.png"
            draggable="false"
            placeholder="blur"
            blurDataURL={Color.fromHex(colorStats.averageColor).then(colorToDataUrl).value}
            height={Math.round((width / 1920) * 1080)}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            {...{ width, quality }}
        />
    );
}

AVintageMapOfTheStarsAndConstellationsWithDA8587861961f4ac0B6c14b84cb2395310_3_Image.metadata =
    metadata satisfies IWallpaperMetadata;
AVintageMapOfTheStarsAndConstellationsWithDA8587861961f4ac0B6c14b84cb2395310_3_Image.colorStats =
    hydrateColorStats(colorStats);
AVintageMapOfTheStarsAndConstellationsWithDA8587861961f4ac0B6c14b84cb2395310_3_Image.texts =
    texts satisfies IWallpaperTexts;
