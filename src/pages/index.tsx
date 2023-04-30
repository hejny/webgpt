import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Vector } from 'xyzt';
import { generated_wallpapers } from '../../assets/ai/wallpaper/index';
import { IWallpaperComponent } from '../../assets/ai/wallpaper/IWallpaperComponent';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { AppHead } from '../sections/00-AppHead/AppHead';
import { WelcomeSection } from '../sections/10-Welcome/Welcome';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/common.module.css';

export default function IndexPage({ lang }: any) {
    let Wallpaper: IWallpaperComponent;

    const router = useRouter();
    const { wallpaper: wallpaperId } = router.query;

    Wallpaper = generated_wallpapers.find((wallpaper) => wallpaper.metadata.id === wallpaperId)!;

    if (!Wallpaper) {
        Wallpaper = generated_wallpapers.find(
            (wallpaper) => wallpaper.metadata.id === '56f04b34-9209-4d6f-b465-a0682df3286e',
        )!;
    }
    return (
        <>
            <AppHead />

            <div className={styles.page}>
                <DebugGrid size={new Vector(5, 5)} />
                <header>
                    {/* TODO: Do some system for multiple pages */}
                    <Wallpaper />
                </header>
                <div className={styles.background}>
                    <TiledBackground />
                </div>
                <main>
                    <WelcomeSection variant="HOMEPAGE" />
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
 * TODO: !! Fix Shuffle without React hydration error
 * TODO: !!! All links must work
 * TODO: !!! Make this a personal page - all projects
 * TODO: Add somewhere button [Get in touch]
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: Some linting rule not to use:
 *       NOT> import { useTranslation } from 'react-i18next';
 *       BUT
 *       YES> import { useTranslation } from 'next-i18next';
 */
