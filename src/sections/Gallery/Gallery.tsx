import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { Item } from '../../components/Items/Item';
import { Items } from '../../components/Items/Items';
import { colorToDataUrl } from '../../utils/color/utils/colorToDataUrl';
import { useInitial } from '../../utils/hooks/useInitial';
import { WallpapersContext } from '../../utils/hooks/WallpapersContext';
import { filterWallpapers } from './GalleryFilter/filterWallpapers';
import { GalleryFilter } from './GalleryFilter/GalleryFilter';
import { GalleryFilterInput } from './GalleryFilter/GalleryFilterInput';

interface SampleProps {}

export function GallerySection(props: SampleProps) {
    const {} = props;

    const { t } = useTranslation();
    const wallpapers = useContext(WallpapersContext);

    const [filter, setFilter] = useState<GalleryFilter>({
        limit: 100,
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
            {/*
            <h1>AI Web Maker</h1>
            <p>Web pages listed here are pre-generated using AI:</p>
            */}

            {!isInitial && (
                <GalleryFilterInput
                    defaultFilter={filter}
                    onFilterChange={(newPartialFilter) => setFilter({ ...filter, ...newPartialFilter })}
                />
            )}

            {/*<pre>{JSON.stringify(filter, null, 4)}</pre>*/}

            <Items>
                {
                    // TODO: !! Some pagination
                    filteredWallpapers.map((wallpaper, i) => (
                        // TODO: <MidjourneyImage/>
                        // TODO: Show diffusion as animation
                        <Link
                            prefetch={false /* <- Note: It is too much data to prefetch every page from gallery */}
                            href={`/showcase/${wallpaper.id}`}
                            key={wallpaper.id}
                            // Note: not using target="_blank" maybe instead of that TODO [🧠] some sort of gallery maker/selector
                        >
                            <Item>
                                <Item.Image>
                                    {/* TODO: [🦋] Use here better preview image - with some palette showcase + title + smaller size */}
                                    {/* TODO: [🦋] Show likedStatus here */}
                                    <Image
                                        src={wallpaper.src}
                                        alt={wallpaper.prompt}
                                        draggable="false"
                                        placeholder="blur"
                                        blurDataURL={colorToDataUrl(wallpaper.colorStats.averageColor)}
                                        quality={55}
                                        width={Math.round(1920 / 2)}
                                        height={Math.round(1080 / 2)}
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                </Item.Image>
                                {/*
                                TODO: !! [2] + Probbably use Item.FloatingTitle
                                <Item.Image>
                                    <style>{`
                                        @import url('https://fonts.googleapis.com/css2?family=${wallpaper.font
                                            .split(' ')
                                            .join('+')}&amp;display=swap}');
                                    `}</style>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                            fontFamily: `'${wallpaper.font}', sans-serif` ,
                                        }}
                                        onClick={(event) => {
                                            (event.target as HTMLDivElement).setAttribute(
                                                'contenteditable',
                                                'true',
                                            );
                                            (event.target as HTMLDivElement).setAttribute(
                                                'spellcheck',
                                                'false',
                                            );
                                            // TODO: !!! Also save the changes after editing
                                        }}
                                    >
                                        {wallpaper.title}
                                    </div>
                                </Item.Image>
                                */}
                                {/*
                                <Item.Description>
                                    <ImagineTag>
                                        {wallpaper.prompt /* TODO: !! [2] Hide or show just title+font NOT prompt * /}
                                    </ImagineTag>

                                    {/*
                                        TODO: !! Put in downloads link to MidJourney>

                                        <a
                                            href="https://www.midjourney.com/app/jobs/..." /* <- From metadata * /
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                        
                                        
                                    * /}
                                </Item.Description>
                                */}
                            </Item>
                        </Link>
                    ))
                }
            </Items>
        </>
    );
}

/**
 * TODO: Serialize filters to URL via router not here as state
 */
