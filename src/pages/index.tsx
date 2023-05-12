import { Oswald } from '@next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { Vector } from 'xyzt';
import { generated_wallpapers } from '../../assets/ai/wallpaper';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { HeaderWallpaper } from '../components/HeaderWallpaper/HeaderWallpaper';
import { ImagineTag } from '../components/ImagineTag/ImagineTag';
import { Item } from '../components/Items/Item';
import { Items } from '../components/Items/Items';
import { Section } from '../components/Section/Section';
import { SkinStyle } from '../components/SkinStyle/SkinStyle';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { AppHead } from '../sections/00-AppHead/AppHead';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/common.module.css';
import { classNames } from '../utils/classNames';
import { useWallpaper } from '../utils/hooks/useWallpaper';
import { skinFromWallpaper } from '../utils/skinFromWallpaper';

const oswaltFont = Oswald({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

export default function GalleryPage() {
    const Wallpaper = useWallpaper();

    return (
        <>
            <AppHead subtitle="Gallery" /* <- TODO: !! Translate */ />
            <SkinStyle skin={skinFromWallpaper(Wallpaper)} />

            <div className={classNames(styles.page, oswaltFont.className)}>
                <DebugGrid size={new Vector(5, 5)} />
                <header>
                    <HeaderWallpaper {...{ Wallpaper }} />
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
                            {generated_wallpapers
                                // Random sort
                                .sort(() => Math.random() - 0.5)
                                .slice(0, 50) /* <- TODO: !!! Some inteligent pagination */
                                .map((Wallpaper, i) => (
                                    // TODO: <MidjourneyImage/>
                                    // TODO: Show diffusion as animation
                                    <Link
                                        href={`/showcase?wallpaper=${Wallpaper.metadata.id}`}
                                        key={i /* <- TODO: Better */}
                                        // Note: not using target="_blank" maybe instead of that TODO [🧠] some sort of gallery maker/selector
                                    >
                                        <Item>
                                            <Item.Image>
                                                <Wallpaper quality={55} width={1920 / 2} />
                                            </Item.Image>
                                            <Item.Description>
                                                <ImagineTag>{Wallpaper.metadata.full_command}</ImagineTag>

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
        </>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

/**
 * TODO: !!! Filters
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
