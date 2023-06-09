import { Barlow_Condensed } from '@next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { JsonObject } from 'type-fest';
import { getWallpapers } from '../../scripts/utils/wallpaper/getWallpapers';
import { IWallpaper } from '../../src/utils/IWallpaper';
import { StaticAppHead } from '../sections/00-AppHead/StaticAppHead';
import { GallerySection } from '../sections/Gallery/Gallery';
import styles from '../styles/static.module.css';
import { classNames } from '../utils/classNames';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { hydrateWallpapers } from '../utils/hydrateWallpapers';

const font = Barlow_Condensed({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

export interface GalleryPageProps {
    wallpapers: Array<JsonObject & IWallpaper>;
}

export default function GalleryPage({ wallpapers }: GalleryPageProps) {
    return (
        <WallpapersContext.Provider
            value={hydrateWallpapers(wallpapers)} /* <- Is this the right place to be Provider in? */
        >
            <StaticAppHead subtitle={null} />

            <div className={classNames(styles.page, font.className)}>
                <main>
                    <h1>AI Web Maker</h1>
                    <p>Web pages listed here are pre-generated using AI:</p>

                    {/* <HomepageWelcomeSection variant="SIDEPAGE" />*/}
                    <GallerySection />
                </main>

                {/* TODO: Make here footer
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
            wallpapers: (await getWallpapers()).map((fullWallpaper) => {
                const { id, src, colorStats, title } = fullWallpaper;
                return {
                    id,
                    src,
                    prompt: '[🟥]' /* <- Note: [🟥] No need to pass everything into index page */,
                    colorStats /* <- TODO: !! Also reduce colorStats */,
                    // TODO: shapeStats> IWallpaperShapeStats;
                    title,
                    content: '[🟥]' /* <- Note: [🟥] No need to pass everything into index page */,
                } satisfies IWallpaper;
            }),
        },
    };
}

/**
 * TODO: !!! This should be in /embed/gallery and index should be generated from this and create more indexes
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
