import { useState } from 'react';
import { forAnimationFrame } from 'waitasecond';
import { COLORSTATS_COMPUTE_METHODS } from '../../../config';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { createImageInBrowser } from '../../utils/image/createImageInBrowser';
import { Select } from '../Select/Select';
import { WorkInProgress } from '../WorkInProgress/WorkInProgress';

/**
 * Function to compute color statistics for a wallpaper using different algorithms ⁘
 * 
 * 
 * @returns {JSX.Element} - JSX element containing a select input for choosing color algorithm and a loading indicator during computation
 */
export function ColorsModalColorAlgoritm() {
    const [wallpaper, modifyWallpaper] = useWallpaper();
    const [isComputing, setComputing] = useState(false);

    return (
        <>
            <Select
                isDisabled={isComputing}
                label="Color algorithm"
                value={wallpaper.colorStats.version}
                onChange={async (newVersion) => {
                    setComputing(true);
                    await forAnimationFrame();

                    try {
/**
 * Find the compute method based on the selected version ⁘
 * 
 * 
 * @type {{ version: string, compute: Function }}
 */
                        const compute = COLORSTATS_COMPUTE_METHODS.find(({ version }) => newVersion === version);
                        if (!compute) {
                            setComputing(false);
                            throw new Error(`Unknown color algorithm version: ${newVersion}`);
                        }

                        // TODO: !! [🧠] Whe best way to report progress from createImageInBrowser and compute

                        const start = performance.now();
                        console.info('🎨', { wallpaper });

/**
 * Create an image object in the browser based on the wallpaper source ⁘
 * 
 * 
 * @type {HTMLImageElement}
 */
                        const image = await createImageInBrowser(wallpaper.src);
                        console.info('🎨', { image });

/**
 * Compute the new color statistics using the selected algorithm ⁘
 * 
 * 
 * @type {Object}
 */
                        const newColorStats = await compute(image);

                        console.info('🎨', { newColorStats });
                        const end = performance.now();
                        const duration = end - start;
                        console.info(
                            '🎨',
                            `Compute of ${newVersion} took ${Math.ceil(((duration / 1000) * 10) / 10)}s`,
                        );

                        modifyWallpaper((modifiedWallpaper) => {
                            modifiedWallpaper.colorStats = newColorStats;
                            modifiedWallpaper.saveStage = 'EDITED';
                            return modifiedWallpaper;
                        });
                    } catch (error) {
                        if (!(error instanceof Error)) {
                            throw error;
                        }

                        console.error(error);
                        alert(`There was an error while computing colors via ${newVersion}\n\n${error.message}`);
                    } finally {
                        setComputing(false);
                    }
                }}
                visibleButtons={0}
                options={Object.fromEntries(COLORSTATS_COMPUTE_METHODS.map(({ version }) => [version, version]))}
            />
            {isComputing && <WorkInProgress />}
        </>
    );
}
