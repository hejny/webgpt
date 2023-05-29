import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GalleryPageProps } from '.';
import { getWallpapers } from '../../scripts/utils/wallpaper/getWallpapers';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { StaticAppHead } from '../sections/00-AppHead/StaticAppHead';
import { FooterSection } from '../sections/90-Footer/Footer';
import { TechnicalInfo } from '../sections/TechnicalInfo/TechnicalInfo';
import styles from '../styles/static.module.css';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { hydrateWallpapers } from '../utils/hydrateWallpapers';

export default function AboutPage() {
    return (
        <>
            <StaticAppHead subtitle="About" /* <- TODO: !! Translate */ />

            <div className={styles.page}>
                <header>
                    {/* TODO: Do some system for multiple pages */}
                    {/* <CaveSection /> */}
                </header>
                <div className={styles.background}>
                    {/* TODO: Do some system for multiple pages */}
                    <TiledBackground />
                </div>
                <main>
                    {/* <WelcomeSection variant="SIDEPAGE" /> */}
                    <TechnicalInfo />
                </main>
                <footer>
                    <FooterSection />
                </footer>
            </div>
        </>
    );
}

/**
 * TODO: Make or remove this page
 */
