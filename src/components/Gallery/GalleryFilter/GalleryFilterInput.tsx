import { debounce } from 'lodash';
import { Color } from '../../../utils/color/Color';
import { LikedStatus } from '../../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { useStateWithReporting } from '../../../utils/hooks/useStateWithReporting';
import type { WithTake } from '../../../utils/take/interfaces/ITakeChain';
import { ColorInput } from '../../ColorPreview/ColorInput/ColorInput';
import { MarkdownContent } from '../../MarkdownContent/MarkdownContent';
import { Select } from '../../Select/Select';
import styles from './GalleryFilterInput.module.css';
import { IGalleryFilter, Order } from './IGalleryFilter';

interface GalleryFilterProps {
    /**
     * The default filter to use
     */
    defaultFilter: IGalleryFilter;

    /**
     * Called when the filter changes
     */
    onFilterChange(newPartialFilter: Partial<IGalleryFilter>): void;
}

/**
 * Renders the filters for <Gallery />
 */
export function GalleryFilterInput(props: GalleryFilterProps) {
    const { defaultFilter, onFilterChange } = props;

    const [fulltext, setFulltext] = useStateWithReporting<string | undefined>(defaultFilter.fulltext, (fulltext) =>
        onFilterChange({ fulltext }),
    );
    const [color, setColor] = useStateWithReporting<WithTake<Color> | undefined>(
        defaultFilter.color || undefined,
        (color) => onFilterChange({ color }),
    );
    const [likedStatus, setLikedStatus] = useStateWithReporting<keyof typeof LikedStatus | 'ALL'>(
        defaultFilter.likedStatus,
        (likedStatus) => onFilterChange({ likedStatus }),
    );
    const [limit, setLimit] = useStateWithReporting<number>(defaultFilter.limit, (limit) => onFilterChange({ limit }));
    const [order, setOrder] = useStateWithReporting<keyof typeof Order>(defaultFilter.order, (order) =>
        onFilterChange({ order }),
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
                <ColorInput value={color || Color.fromHex('#777777')} onChange={setColor} />
                {color && (
                    <div onClick={() => setColor(undefined)}>
                        <MarkdownContent content="❌" isUsingOpenmoji />
                    </div>
                )}
            </div>

            <Select
                className={styles.filter}
                label="Like status:"
                value={likedStatus}
                onChange={(newLikedStatus) => void setLikedStatus(newLikedStatus)}
                visibleButtons={Infinity}
                options={{ ...LikedStatus, ALL: 'All' }}
            />

            <Select
                className={styles.filter}
                label="Items on page:"
                value={limit}
                onChange={(newLimit) => void setLimit(newLimit)}
                visibleButtons={Infinity}
                options={{
                    // Note: As a highly composite numbers to fit in misc grids
                    6: '6',
                    24: '24',
                    60: '60',
                    180: '180',
                    Infinity: 'All',
                }}
            />

            <Select
                className={styles.filter}
                label={`Order:`}
                value={order}
                onChange={(newOrder) => void setOrder(newOrder)}
                visibleButtons={Infinity}
                options={Order}
            />
        </div>
    );
}
