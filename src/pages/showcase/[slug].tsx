import { GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Vector } from 'xyzt';
import { getWallpapers } from '../../../scripts/utils/wallpaper/getWallpapers';
import { DebugGrid } from '../../components/DebugGrid/DebugGrid';
import { GetWebButton } from '../../components/GetWebButton/GetWebButton';
import { HeaderWallpaper } from '../../components/HeaderWallpaper/HeaderWallpaper';
import { TiledBackground } from '../../components/TiledBackground/TiledBackground';
import { ShowcaseAppHead } from '../../sections/00-AppHead/ShowcaseAppHead';
import { ShowcaseWelcomeSection } from '../../sections/10-Welcome/ShowcaseWelcome';
import { FooterSection } from '../../sections/90-Footer/Footer';
import styles from '../../styles/showcase.module.css';
import { WallpapersContext } from '../../utils/hooks/useWallpaper';
import { hydrateWallpaper } from '../../utils/hydrateWallpaper';
import { IWallpaper } from '../../utils/IWallpaper';
import { randomItem } from '../../utils/randomItem';

export interface ShowcasePageProps {
    currentWallpaper: IWallpaper;
    randomWallpaper: IWallpaper;
}

export default function ShowcasePage(props: ShowcasePageProps) {
    let { currentWallpaper, randomWallpaper } = props;
    currentWallpaper = hydrateWallpaper(currentWallpaper);
    randomWallpaper = hydrateWallpaper(randomWallpaper);

    return (
        <WallpapersContext.Provider value={[currentWallpaper]} /* <- Is this the right place to be Provider in? */>
            <ShowcaseAppHead />
            <Head>
                <link
                    // TODO: !!! Is this working? Maybe use prerender
                    rel="prefetch"
                    href={randomWallpaper.src}
                    as="image" /* <- Note: [🤰] Here is preloaded randomWallpaper */
                />
            </Head>

            <div className={styles.page}>
                <DebugGrid size={new Vector(5, 5)} />
                <header>
                    <HeaderWallpaper />
                </header>
                <div className={styles.background}>
                    <TiledBackground />
                </div>
                <main>
                    <ShowcaseWelcomeSection />
                    {/*<ReferencesSection variant="SHORT" />*/}
                </main>
                <GetWebButton {...{ randomWallpaper }} />
                <footer>
                    <FooterSection />
                </footer>
            </div>
        </WallpapersContext.Provider>
    );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: (await getWallpapers()).map(({ id }) => `/showcase/${id}`), // <- Note: indicates that no page needs be created at build time
        fallback: 'blocking', // <- Note: indicates the type of fallback - TODO: !!! Probbably change to false and solve 404 problem
    };
};

export async function getStaticProps({
    locale,
    params,
}: {
    locale: string;
    params: any /* <- TODO: !! Type propperly + NOT manually */;
}) {
    const { slug } = params;

    const wallpapers = await getWallpapers();
    const currentWallpaper = wallpapers.find(({ id }) => id === slug);
    const randomWallpaper = randomItem(
        ...wallpapers,
    ); /* <- TODO: !! Make big chain to traverse whole gallery by clicking random + minor simmilar chains  */

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

            currentWallpaper,
            randomWallpaper,
        },
    };
}

/**
 * TODO: !! Special effect for each wallpaper
 * TODO: !!! When sharing link to showcase, preview to socials should work
 * TODO: !!! Preview as on [Mobile][Tablet][Desktop]
 * TODO: !!! Preview as on [Mobile][Tablet] - show the direct QR code
 * TODO: !!! [🧶] Add overlay which explains how it works and lead to FAQ permalink
 * TODO: !! Better IDs for wallpapers - make it without GET parameters
 * TODO: !! Make foreground-background paralax effect for each wallpaper
 * TODO: !! Fix Shuffle without React hydration error

 * TODO: Add somewhere button [Get in touch]
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: Some linting rule not to use:
 *       NOT> import { useTranslation } from 'react-i18next';
 *       BUT
 *       YES> import { useTranslation } from 'next-i18next';
 * TODO: !! Better url than /showcase/...
 * TODO: [👕][🧠] What should be the ID of customized wallpaper?
 */
