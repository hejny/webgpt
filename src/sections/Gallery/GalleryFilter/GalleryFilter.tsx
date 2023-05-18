import { debounce } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { DIFFERENT_COLOR_DISTANCE_THEASHOLD_RATIO } from '../../../../config';
import { SelectWithFirst } from '../../../components/SelectWithFirst/SelectWithFirst';
import { Color } from '../../../utils/color/Color';
import { colorDistanceSquared } from '../../../utils/color/utils/colorDistance';
import { IWallpaper } from '../../../utils/IWallpaper';
import { WithTake } from '../../../utils/take/interfaces/ITakeChain';
import styles from './GalleryFilter.module.css';

// TODO: !!! Break into files

export interface GalleryFilter {
    fulltext?: string;
    color?: WithTake<Color>;
    limit: number;
    isRandom: boolean;
    // TODO: Combination of filters AND, OR
    // TODO: Fulltext
    // TODO: !!! Serialize to URL via router
}

interface GalleryFilterProps {
    defaultFilter: GalleryFilter;
    onFilterChange(newFilter: GalleryFilter): void;
}

export function filterWallpapers(wallpapers: Array<IWallpaper>, filter: GalleryFilter): Array<IWallpaper> {
    console.log('filterWallpapers');
    const { fulltext, color, limit, isRandom } = filter;

    if (isRandom) {
        // Note: .sort method is mutating array so making a copy before
        wallpapers = [...wallpapers];
    }

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

    if (isRandom) {
        // Note: .sort method is mutating array so no need to assign it back
        wallpapers.sort(() => Math.random() - 0.5);
    }

    if (limit < Infinity) {
        wallpapers = wallpapers.slice(0, limit);
    }

    return wallpapers;
}

export function GalleryFilterInput(props: GalleryFilterProps) {
    const { defaultFilter, onFilterChange } = props;

    const { t } = useTranslation();

    const [fulltext, setFulltext] = useState<string | undefined>(defaultFilter.fulltext);
    const [color, setColor] = useState<WithTake<Color> | undefined>(defaultFilter.color || undefined);
    const [limit, setLimit] = useState<number>(defaultFilter.limit);
    const [isRandom, setRandom] = useState<boolean>(false);

    // !!! [4] Remove const changeColor = (color: Color | null)=>{setColor(color);onFilterChange({...})}

    if (
        defaultFilter.fulltext !== fulltext ||
        defaultFilter.color?.toHex() !== color?.toHex() ||
        defaultFilter.limit !== limit ||
        defaultFilter.isRandom !== isRandom
    ) {
        onFilterChange({ fulltext, color, limit, isRandom }); /* <- !!!! [4] Better */
    }

    return (
        <div className={styles.GalleryFilter}>
            {/* <h3>Filters</h3> */}

            <div>
                Search:&nbsp;&nbsp;
                <input
                    type="text"
                    defaultValue={fulltext || ''}
                    onChange={debounce((event) => setFulltext(event.target.value.trim() || undefined), 500)}
                />
            </div>

            <div>
                Prefer color:&nbsp;&nbsp;
                <input
                    type="color"
                    defaultValue={(color || Color.get('white')).toHex()}
                    onChange={debounce((event) => setColor(Color.fromHex(event.target.value)), 500)}
                />
            </div>

            <SelectWithFirst
                title={`Items on page: `}
                value={limit}
                onChange={(newLimit) => void setLimit(newLimit)}
                numberOfButtons={4}
                options={[
                    { id: 10, title: '10' },
                    { id: 100, title: '100' },
                    { id: 500, title: '500' },
                    { id: Infinity, title: 'All' },
                ]}
            />

            <SelectWithFirst
                title={`Order: `}
                value={isRandom}
                onChange={(newIsRandom) => void setRandom(newIsRandom)}
                numberOfButtons={2}
                options={[
                    { id: false, title: 'Ascending (A-Z)' },
                    // TODO: Descending (Z-A)
                    { id: true, title: 'Random' },
                ]}
            />
        </div>
    );
}
