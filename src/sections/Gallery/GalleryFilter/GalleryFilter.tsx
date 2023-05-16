import { debounce } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { SelectWithFirst } from '../../../components/SelectWithFirst/SelectWithFirst';
import { Color } from '../../../utils/color/Color';
import { WithTake } from '../../../utils/take/interfaces/ITakeChain';

interface GalleryWhereOrderLimit {
    color?: WithTake<Color>;
    limit: number;
    isRandom: boolean;
    // TODO: Combination of filters AND, OR
    // TODO: Fulltext
    // TODO: !!! Serialize to URL via router
}

interface GalleryFilterProps {
    defaultFilter: GalleryWhereOrderLimit;
    onFilterChange(newFilter: GalleryWhereOrderLimit): void;
}

export function GalleryFilter(props: GalleryFilterProps) {
    const { defaultFilter, onFilterChange } = props;

    const { t } = useTranslation();

    const [color, setColor] = useState<WithTake<Color> | undefined>(defaultFilter.color || undefined);
    const [limit, setLimit] = useState<number>(defaultFilter.limit);
    const [isRandom, setRandom] = useState<boolean>(false);

    onFilterChange({ color, limit, isRandom }); /* <- !!!! Better */
    // const changeColor = (color: Color | null)=>{setColor(color);onFilterChange({...})}

    return (
        <div>
            <h3>Filters</h3>

            <div>
                Prefer color:
                <input
                    type="color"
                    defaultValue={(color || Color.get('white')).toHex()}
                    onChange={debounce((event) => setColor(Color.fromHex(event.target.value)), 500)}
                />
            </div>

            <SelectWithFirst
                title={`Limit`}
                value={limit}
                onChange={(newLimit) => void setLimit(newLimit)}
                numberOfButtons={1}
                options={[
                    { id: Infinity, title: 'Vše' },
                    { id: 100, title: '100' },
                    { id: 10, title: '10' },
                ]}
            />

            <SelectWithFirst
                title={`Limit`}
                value={isRandom}
                onChange={(newIsRandom) => void setRandom(newIsRandom)}
                numberOfButtons={2}
                options={[
                    { id: false, title: 'V pořadí' },
                    { id: true, title: 'Náhodně' },
                ]}
            />
        </div>
    );
}
