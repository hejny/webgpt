import { Oswald } from '@next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { Vector } from 'xyzt';
import { IWallpaper } from '../../assets/ai/wallpaper/IWallpaper';
import { getWallpapers } from '../../scripts/utils/wallpaper/getWallpapers';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { HeaderWallpaper } from '../components/HeaderWallpaper/HeaderWallpaper';
import { ImagineTag } from '../components/ImagineTag/ImagineTag';
import { Item } from '../components/Items/Item';
import { Items } from '../components/Items/Items';
import { Section } from '../components/Section/Section';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { AppHead } from '../sections/00-AppHead/AppHead';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/common.module.css';
import { classNames } from '../utils/classNames';
import { colorToDataUrl } from '../utils/color/utils/colorToDataUrl';
import { WallpapersContext } from '../utils/hooks/useWallpaper';

const oswaltFont = Oswald({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

export interface PageProps {
    wallpapers: Array<IWallpaper>;
}

export default function GalleryPage({ wallpapers }: PageProps) {
    return (
        <WallpapersContext.Provider value={wallpapers} /* <- Is this the right place to be Provider in? */>
            <AppHead /*subtitle="Gallery" /* <- TODO: !! Translate */ />

            <div className={classNames(styles.page, oswaltFont.className)}>
                <DebugGrid size={new Vector(5, 5)} />
                <header>
                    <HeaderWallpaper />
                </header>
                <div className={styles.background}>
                    {/* TODO: Do some system for multiple pages */}
                    <TiledBackground />
                </div>
                <main>
                    {/* !!! <HomepageWelcomeSection variant="SIDEPAGE" />*/}
                    <Section>
                        {/* <- TODO: !! Make propper secrion from this */}
                        {/* TODO: !! Translate */}
                        <h2>Gallery</h2>
                        <p>Images used on this page are generated using MidJourney:</p>

                        <Items itemsOnRow={2}>
                            {wallpapers
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
                                            <Item.Description>
                                                <ImagineTag>{wallpaper.prompt}</ImagineTag>

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
                </main>
                <footer>
                    <FooterSection />
                </footer>
            </div>
        </WallpapersContext.Provider>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            wallpapers: await getWallpapers(),
        },
    };
}

/**
 * TODO: !!! [🧶] FAQ section - how it works
 * TODO: !!! Design for gallery - split showcase and gallery
 * TODO: !!! Filters - [Shuffle][Fulltext][Limit][Light/Dark/Color]
 * TODO: !! Preview page on hover on each item
 * TODO: !! i18n + make section
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: [🪒] Can be fonts shared between all pages?
 * TODO: Write better about how are images created
 *       TODO: Connect with section/article about AI generative technology
 * TODO: Some image frames
 * TODO: Make some menu
 * TODO: [🧈] Best way how to share page css
 * TODO: DRY with index.tsx
 * TODO: [🔗] ACRY should we use <a ...>...</a> OR <Link ...>...</Link> for external links in Next App
 * TODO: Generate the components like <CaveOfIdeasWithTransparentLookThroughImageXfe3480c5 /> with links
 */
