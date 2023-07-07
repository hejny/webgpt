import { useState } from 'react';
import { forTime } from 'waitasecond';
import { COLORSTATS_COMPUTE_METHODS } from '../../../config';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { createImageInBrowser } from '../../utils/image/createImageInBrowser';
import { Select } from '../Select/Select';

/**
 * @@
 */
export function EditModalColorAlgoritm() {
    const [wallpaper, modifyWallpaper] = useWallpaper();
    const [isComputing, setComputing] = useState(false);

    return (
        <Select
            label="Color algorithm"
            value={wallpaper.colorStats.version}
            onChange={async (newVersion) => {
                setComputing(true);
                await forTime(10);

                const compute = COLORSTATS_COMPUTE_METHODS.find(({ version }) => newVersion === version);
                if (!compute) {
                    setComputing(false);
                    throw new Error(`Unknown color algorithm version: ${newVersion}`);
                }

                // TODO: [🧠] !!! Fix tainted canvas error
                // TODO: [🧠] !!! Whe best way to report progress from createImageInBrowser and compute
                const newColorStats = await compute(await createImageInBrowser(wallpaper.src));

                modifyWallpaper((modifiedWallpaper) => {
                    modifiedWallpaper.colorStats = newColorStats;
                    modifiedWallpaper.saveStage = 'EDITED';
                    return modifiedWallpaper;
                });

                await forTime(10);
                setComputing(false);
            }}
            visibleButtons={0}
            options={Object.fromEntries(COLORSTATS_COMPUTE_METHODS.map(({ version }) => [version, version]))}
        />
    );
}
