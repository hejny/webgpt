import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Vector } from 'xyzt';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { HeaderWallpaper } from '../components/HeaderWallpaper/HeaderWallpaper';
import { SkinStyle } from '../components/SkinStyle/SkinStyle';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { AppHead } from '../sections/00-AppHead/AppHead';
import { ShowcaseWelcomeSection } from '../sections/10-Welcome/ShowcaseWelcome';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/common.module.css';
import { useWallpaper } from '../utils/hooks/useWallpaper';
import { skinFromWallpaper } from '../utils/skinFromWallpaper';

export default function ShowcasePage({ lang }: any) {
    const Wallpaper = useWallpaper();

    return (
        <>
            <AppHead />
            <SkinStyle skin={skinFromWallpaper(Wallpaper)} />

            <div className={styles.page}>
                <DebugGrid size={new Vector(5, 5)} />
                <header>
                    <HeaderWallpaper {...{ Wallpaper }} />
                </header>
                <div className={styles.background}>
                    <TiledBackground />
                </div>
                <main>
                    <ShowcaseWelcomeSection Wallpaper={Wallpaper!} />
                    {/*<ReferencesSection variant="SHORT" />*/}
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
 * TODO: !!! Showcase should contain link back to mainpage <Link className="button" href="/">{t('Welcome.back-home')}</Link>
 * TODO: !!! Special text for each wallpaper
 * TODO: !!! Special effect for each wallpaper
 * TODO: !!! When sharing link to showcase, preview to socials should work
 * TODO: !!! Preview as on [Mobile][Tablet][Desktop]
 * TODO: !!! Preview as on [Mobile][Tablet] - show the direct QR code
 * TODO: !!! Button to [I want this website] 
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
