import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useInitial } from '../../utils/hooks/useInitial';
import { WallpapersContext } from '../../utils/hooks/WallpapersContext';
import styles from './Gallery.module.css';
import { filterWallpapers } from './GalleryFilter/filterWallpapers';
import { GalleryFilter } from './GalleryFilter/GalleryFilter';
import { GalleryFilterInput } from './GalleryFilter/GalleryFilterInput';

interface SampleProps {}

export function GallerySection(props: SampleProps) {
    const {} = props;

    const { t } = useTranslation();
    const wallpapers = useContext(WallpapersContext);

    const [filter, setFilter] = useState<GalleryFilter>({
        limit: 6 /* <- Note: As a highly composite number to fit in misc grids */,
        isRandom: false /* <- TODO: In future default order should be by populariry */,
    });

    const isInitial = useInitial(() => {
        // Note: We want to show random wallpapers BUT we don't want have undeterministic SSR state because of hydration errors and also because we want better control on order for example for search engines
        setFilter({ ...filter, isRandom: true });
    });

    const filteredWallpapers = filterWallpapers(
        Object.values(wallpapers).map((wallpaperSubject) => wallpaperSubject.value),
        filter,
    ); /* <- TODO: !!! Cache (memoize) + Do async */

    return (
        <>
            {!isInitial && (
                <GalleryFilterInput
                    defaultFilter={filter}
                    onFilterChange={(newPartialFilter) => setFilter({ ...filter, ...newPartialFilter })}
                />
            )}

            <div className={styles.gallery}>
                <div className={styles.galleryItemsOuter}>
                    <div className={styles.galleryItemsInner}>
                        {
                            // TODO: !! Some pagination
                            filteredWallpapers.map((wallpaper, i) => (
                                // TODO: <MidjourneyImage/>
                                // TODO: Show diffusion as animation

                                <Link
                                    key={wallpaper.id}
                                    href={`/showcase/${wallpaper.id}`}
                                    prefetch={
                                        false /* <- Note: It is too much data to prefetch every page from gallery */
                                    }
                                    style={{ backgroundColor: wallpaper.colorStats.palette[0].value.toHex() }}
                                >
                                    <iframe
                                        // TODO: [🦋] Use here better preview image - with some palette showcase + title + smaller size
                                        // TODO: [🦋] Show likedStatus here
                                        src={`/showcase/${wallpaper.id}?mode=preview`}
                                        allowTransparency={false /* as a optimization */}
                                        scrolling="no" /* <- TODO: Why deprecated? */
                                        frameBorder="0" /* <- TODO: Why deprecated? */
                                        style={{ backgroundColor: wallpaper.colorStats.palette[0].value.toHex() }}
                                    ></iframe>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

/**
 * TODO: Serialize filters to URL via router not here as state
 */
