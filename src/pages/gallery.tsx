import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Barlow_Condensed } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getHardcodedWallpapers } from '../../scripts/utils/hardcoded-wallpaper/getHardcodedWallpapers';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { GallerySection } from '../components/Gallery/Gallery';
import styles from '../styles/static.module.css';
import { classNames } from '../utils/classNames';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { hydrateWallpapers } from '../utils/hydrateWallpapers';
import { IWallpaperSerialized } from '../utils/IWallpaper';

const font = Barlow_Condensed({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

interface GalleryPageProps {
    wallpapers: Array<IWallpaperSerialized>;
}

export default function GalleryPage({ wallpapers }: GalleryPageProps) {
    const router = useRouter();
    const homeUrl = typeof router.query.home === 'string' ? router.query.home : null;

    return (
        <WallpapersContext.Provider
            value={hydrateWallpapers(wallpapers)} /* <- Is this the right place to be Provider in? */
        >
            <StaticAppHead subtitle={null} />

            <div className={classNames(styles.page, font.className)}>
                <main>
                    <h1>AI Web Maker</h1>
                    <p>Web pages listed here are pre-generated using AI:</p>

                    {homeUrl && (
                        // TODO: !! Allow also to pass a full menu / URL for menu script
                        // TODO: !! Restrict homeUrl to be only from the same domain
                        // TODO: Here can be also passed background image of the home page
                        <Link href={homeUrl} className={classNames('button', styles.homeButton)}>
                            Home
                        </Link>
                    )}

                    {/* <HomepageWelcomeSection variant="SIDEPAGE" />*/}
                    <GallerySection />
                </main>

                {/* TODO: Make here some footer
                <footer>
                    <FooterSection />
                </footer>
                */}
            </div>
        </WallpapersContext.Provider>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            ...({
                wallpapers: (await getHardcodedWallpapers(/* TODO: !!! Here should be dynamic filtering */)).map((fullWallpaper) => {
                    const { id, parent, src, colorStats, title, keywords, isPublic, author } = fullWallpaper;
                    return {
                        id,
                        parent,
                        src,
                        prompt: '[🟥]' /* <- Note: [🟥] No need to pass everything into index page */,
                        colorStats /* <- TODO: !! Also reduce colorStats */,
                        // TODO: shapeStats> IWallpaperShapeStats;
                        title,
                        content: '[🟥]' /* <- Note: [🟥] No need to pass everything into index page */,
                        keywords,
                        isPublic,
                        author,
                    } satisfies IWallpaperSerialized;
                }),
            } satisfies GalleryPageProps),
        },
    };
}

/**
 * TODO: !! [🧶] FAQ section - how it works
 * TODO: !! [1] Filters - [Fulltext][Light/Dark/Color]
 * TODO: !! [1] Order - [Relevance][DateGenerated][Random][Lightness][Color] / [ASC][DESC]
 * TODO: !! [1] Limit
 * TODO: !! [1] Pagination
 * TODO: !! Preview page on hover on each item
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: [🪒] Can be fonts shared between all pages?
 * TODO: Write better about how are images created
 *       TODO: Connect with section/article about AI generative technology
 * TODO: [🧈] Best way how to share page css
 * TODO: [🔗] ACRY should we use <a ...>...</a> OR <Link ...>...</Link> for external links in Next App
 */
