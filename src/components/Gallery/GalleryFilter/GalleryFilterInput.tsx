import { debounce } from 'lodash';
import { useTranslation } from 'next-i18next';
import { Article } from '../../../components/Article/Article';
import { SelectWithFirst } from '../../../components/SelectWithFirst/SelectWithFirst';
import { Color } from '../../../utils/color/Color';
import { LikedStatus } from '../../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { useStateWithReporting } from '../../../utils/hooks/useStateWithReporting';
import { WithTake } from '../../../utils/take/interfaces/ITakeChain';
import { GalleryFilter } from './GalleryFilter';
import styles from './GalleryFilterInput.module.css';

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

            <div className={styles.filter}>
                Search:&nbsp;&nbsp;
                <input
                    type="text"
                    defaultValue={fulltext || ''}
                    onChange={debounce((event) => setFulltext(event.target.value.trim() || undefined), 500)}
                />
            </div>

            <div className={styles.filter}>
                Prefer color:&nbsp;&nbsp;
                <input
                    type="color"
                    defaultValue={(color || Color.fromHex('#777777')).toHex()}
                    onChange={debounce((event) => setColor(Color.fromHex(event.target.value)), 500)}
                />
                {color && (
                    <div onClick={() => setColor(undefined)}>
                        <Article content="❌" isUsingOpenmoji />
                    </div>
                )}
            </div>

            <SelectWithFirst
                className={styles.filter}
                title={`Like status: `}
                value={likedStatus}
                onChange={(newLikedStatus) => void setLikedStatus(newLikedStatus)}
                numberOfButtons={Infinity}
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
                className={styles.filter}
                title={`Items on page: `}
                value={limit}
                onChange={(newLimit) => void setLimit(newLimit)}
                numberOfButtons={Infinity}
                options={[
                    // Note: As a highly composite numbers to fit in misc grids
                    { id: 6, title: '6' },
                    { id: 24, title: '24' },
                    { id: 60, title: '60' },
                    { id: 180, title: '180' },
                    { id: Infinity, title: 'All' },
                ]}
            />

            <SelectWithFirst
                className={styles.filter}
                title={`Order: `}
                value={isRandom}
                onChange={(newIsRandom) => void setRandom(newIsRandom)}
                numberOfButtons={Infinity}
                options={[
                    { id: false, title: 'Ascending (A-Z)' },
                    // TODO: Descending (Z-A)
                    { id: true, title: 'Random' },
                ]}
            />
        </div>
    );
}
