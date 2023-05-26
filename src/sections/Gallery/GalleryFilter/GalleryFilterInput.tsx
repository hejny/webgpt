import { debounce } from 'lodash';
import { useTranslation } from 'next-i18next';
import { SelectWithFirst } from '../../../components/SelectWithFirst/SelectWithFirst';
import { Color } from '../../../utils/color/Color';
import { LikedStatus } from '../../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { useStateWithReporting } from '../../../utils/hooks/useStateWithReporting';
import { WithTake } from '../../../utils/take/interfaces/ITakeChain';
import { GalleryFilter } from './GalleryFilter';
import styles from './GalleryFilter.module.css';

interface GalleryFilterProps {
    defaultFilter: GalleryFilter;
    onFilterChange(newPartialFilter: Partial<GalleryFilter>): void;
}

export function GalleryFilterInput(props: GalleryFilterProps) {
    const { defaultFilter, onFilterChange } = props;

    const { t } = useTranslation();

    // debugger;

    const [fulltext, setFulltext] = useStateWithReporting<string | undefined>(defaultFilter.fulltext, (fulltext) =>
        onFilterChange({ fulltext }),
    );
    const [color, setColor] = useStateWithReporting<WithTake<Color> | undefined>(
        defaultFilter.color || undefined,
        (color) => onFilterChange({ color }),
    );
    const [likedStatus, setLikedStatus] = useStateWithReporting<LikedStatus | undefined>(
        defaultFilter.likedStatus,
        (likedStatus) => onFilterChange({ likedStatus }),
    );
    const [limit, setLimit] = useStateWithReporting<number>(defaultFilter.limit, (limit) => onFilterChange({ limit }));
    const [isRandom, setRandom] = useStateWithReporting<boolean>(defaultFilter.isRandom, (isRandom) =>
        onFilterChange({ isRandom }),
    );

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
                title={`Like status: `}
                value={likedStatus}
                onChange={(newLikedStatus) => void setLikedStatus(newLikedStatus)}
                numberOfButtons={5}
                options={[
                    { id: undefined, title: 'All' },
                    { id: 'NONE' as LikedStatus, title: 'None' },
                    { id: 'LOVE' as LikedStatus, title: '❤ Loved' },
                    { id: 'LIKE' as LikedStatus, title: '👍 Liked' },
                    { id: 'NEUTRAL' as LikedStatus, title: '😐 Neutral' },
                    { id: 'DISLIKE' as LikedStatus, title: '👎 Disliked' },
                ]}
            />

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
