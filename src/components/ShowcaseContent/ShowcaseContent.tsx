// import { Aigen } from '../../components/Aigen/Aigen';
import { useRouter } from 'next/router';
import { AigenSimple } from '../../components/Aigen/AigenSimple';
import { HeaderWallpaper } from '../../components/HeaderWallpaper/HeaderWallpaper';
import { TiledBackground } from '../../components/TiledBackground/TiledBackground';
import { FooterSection } from '../Footer/Footer';
import { Menu } from '../Menu/Menu';
import { ShowcaseWelcomeSection } from '../Welcome/ShowcaseWelcome';
import styles from './ShowcaseContent.module.css';

export function ShowcaseContent() {
    const router = useRouter();
    const isPreview = router.query.mode === 'preview'; /* <- TODO: !!! Use useMode */

    return (
        <div className={styles.page}>
            {!isPreview && <AigenSimple />}
            {/* isPreview && <Aigen /> */}

            {!isPreview && <Menu />}

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
            <footer>
                <FooterSection />
            </footer>
        </div>
    );
}

/**
 * TODO: !!!! Add here a color picker for the palette
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
