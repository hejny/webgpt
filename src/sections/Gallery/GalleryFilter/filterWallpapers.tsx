import { DIFFERENT_COLOR_DISTANCE_THEASHOLD_RATIO } from '../../../../config';
import { Color } from '../../../utils/color/Color';
import { colorDistanceSquared } from '../../../utils/color/utils/colorDistance';
import { IWallpaper } from '../../../utils/IWallpaper';
import { GalleryFilter } from './GalleryFilter';

export function filterWallpapers(wallpapers: Array<IWallpaper>, filter: GalleryFilter): Array<IWallpaper> {
    // console.log('filterWallpapers');

    const { fulltext, color, likedStatus, limit, isRandom } = filter;

    // debugger;

    if (fulltext) {
        // TODO: !!! Normalize words
        // TODO: !!! Search in tags, content, title,...
        // TODO: [🔎] Search through keywords @see https://ibb.co/2Fy7kN4
        wallpapers = wallpapers.filter((wallpaper) => wallpaper.prompt.toLowerCase().includes(fulltext.toLowerCase()));
    }

    if (color) {
        // TODO: Search through whole palette (with bigger weight on first color) not average color WHEN palette is available and materialized
        // TODO: !!! If nothing found, increase treashold
        const treasholdSquared =
            colorDistanceSquared(Color.get('black'), Color.get('white')) *
            DIFFERENT_COLOR_DISTANCE_THEASHOLD_RATIO; /* <- TODO: !!! Is here corect work with squaring */
        wallpapers = wallpapers.filter(
            (wallpaper) =>
                colorDistanceSquared(
                    wallpaper.colorStats.averageColor /* <- TODO: !!! Test here whole palette */,
                    color,
                ) <= treasholdSquared,
        );
    }

    if (likedStatus) {
        const localStorageWallpapersLikedStatuses = Object.fromEntries(
            Object.entries(localStorage).filter(([key]) => key.startsWith('likedStatus_')),
        );

        // debugger;

        wallpapers = wallpapers.filter(
            (wallpaper) => localStorageWallpapersLikedStatuses[`likedStatus_${wallpaper.id}`] === likedStatus,
        );
    }

    if (isRandom) {
        // Note: .sort method is mutating array so making a copy before if not copyed already
        //if (!fulltext && !color && !likedStatus) {
        wallpapers = [...wallpapers];
        //}

        // Note: .sort method is mutating array so no need to assign it back
        wallpapers.sort(() => Math.random() - 0.5);
    }

    if (limit < Infinity) {
        wallpapers = wallpapers.slice(0, limit);
    }

    return wallpapers;
}
