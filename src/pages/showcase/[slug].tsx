import { GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Vector } from 'xyzt';
import { PageProps } from '..';
import { getWallpapers } from '../../../scripts/utils/wallpaper/getWallpapers';
import { DebugGrid } from '../../components/DebugGrid/DebugGrid';
import { GetWebButton } from '../../components/GetWebButton/GetWebButton';
import { HeaderWallpaper } from '../../components/HeaderWallpaper/HeaderWallpaper';
import { TiledBackground } from '../../components/TiledBackground/TiledBackground';
import { AppHead } from '../../sections/00-AppHead/AppHead';
import { ShowcaseWelcomeSection } from '../../sections/10-Welcome/ShowcaseWelcome';
import { FooterSection } from '../../sections/90-Footer/Footer';
import styles from '../../styles/common.module.css';
import { WallpapersContext } from '../../utils/hooks/useWallpaper';

export default function ShowcasePage({ wallpapers }: PageProps) {
    return (
        <WallpapersContext.Provider value={wallpapers} /* <- Is this the right place to be Provider in? */>
            <AppHead />

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
                <GetWebButton />
                <footer>
                    <FooterSection />
                </footer>
            </div>
        </WallpapersContext.Provider>
    );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], // <- Note: indicates that no page needs be created at build time
        fallback: 'blocking', // <- Note: indicates the type of fallback
    };
};

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            wallpapers: await getWallpapers(),
        },
    };
}

/**
 * TODO: !!! Showcase should contain link back to mainpage <Link className="button" href="/">{t('Welcome.back-home')}</Link>
 * TODO: !!! Special effect for each wallpaper
 * TODO: !!! When sharing link to showcase, preview to socials should work
 * TODO: !!! Preview as on [Mobile][Tablet][Desktop]
 * TODO: !!! Preview as on [Mobile][Tablet] - show the direct QR code
 * TODO: !! Better IDs for wallpapers - make it without GET parameters
 * TODO: !! Make foreground-background paralax effect for each wallpaper
 * TODO: !! Fix Shuffle without React hydration error

 * TODO: Add somewhere button [Get in touch]
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: Some linting rule not to use:
 *       NOT> import { useTranslation } from 'react-i18next';
 *       BUT
 *       YES> import { useTranslation } from 'next-i18next';
 */
