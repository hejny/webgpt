import { debounce } from 'lodash';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { ImagineTag } from '../../components/ImagineTag/ImagineTag';
import { Item } from '../../components/Items/Item';
import { Items } from '../../components/Items/Items';
import { Section } from '../../components/Section/Section';
import { Color } from '../../utils/color/Color';
import { colorDistanceSquared } from '../../utils/color/utils/colorDistance';
import { colorToDataUrl } from '../../utils/color/utils/colorToDataUrl';
import { WallpapersContext } from '../../utils/hooks/useWallpaper';
import { GalleryFilter } from './GalleryFilter/GalleryFilter';

interface SampleProps {}

export function GallerySection(props: SampleProps) {
    const {} = props;

    const { t } = useTranslation();
    const wallpapers = useContext(WallpapersContext);

    const [preferColor, setPreferColor] = useState<Color | null>(null);

    const sortedWallpapers = wallpapers;

    sortedWallpapers.sort((wallpaper1, wallpaper2) => {
        if (preferColor) {
            const color1 = wallpaper1.colorStats.averageColor;
            const color2 = wallpaper2.colorStats.averageColor;

            const color1Distance = colorDistanceSquared(preferColor, color1);
            const color2Distance = colorDistanceSquared(preferColor, color2);

            return color1Distance - color2Distance;
        }

        return 0;
    });

    return (
        <Section>
            {/* <- TODO: !! Make propper secrion from this */}
            {/* TODO: !! Translate */}
            <h1>🎨 Gallery of webs</h1>
            <p>Web pages listed here are pre-generated using AI:</p>

            <GalleryFilter />
            <br />
            {Math.random()}
            <br />
            {sortedWallpapers.length + ' items'}
            <br />
            <Items itemsOnRow={3}>
                {sortedWallpapers
                    // Random sort
                    //.sort(() => Math.random() - 0.5)
                    // .slice(0, 50) /* <- TODO: !!! Some inteligent pagination */
                    .map((wallpaper, i) => (
                        // TODO: <MidjourneyImage/>
                        // TODO: Show diffusion as animation
                        <Link
                            href={`/showcase/${wallpaper.id}`}
                            key={i /* <- TODO: Better, can we use just id */}
                            // Note: not using target="_blank" maybe instead of that TODO [🧠] some sort of gallery maker/selector
                        >
                            <Item>
                                <Item.Image>
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
                                TODO: !! [2]
                                <Item.Image>
                                    <style>{`
                                        @import url('https://fonts.googleapis.com/css2?family=${wallpaper.font
                                            .split(' ')
                                            .join('+')}&display=swap}');
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
                                <Item.Description>
                                    <ImagineTag>
                                        {wallpaper.prompt /* TODO: !! [2] Hide or show just title+font NOT prompt */}
                                    </ImagineTag>

                                    {/*
                                        TODO: !! Put in downloads link to MidJourney>

                                        <a
                                            href="https://www.midjourney.com/app/jobs/..." /* <- From metadata * /
                                            target="_blank"
                                            rel="noreferrer"
                                        >


                                    */}
                                </Item.Description>
                            </Item>
                        </Link>
                    ))}
            </Items>
        </Section>
    );
}
