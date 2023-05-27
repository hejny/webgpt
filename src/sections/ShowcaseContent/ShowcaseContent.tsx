import { HeaderWallpaper } from '../../components/HeaderWallpaper/HeaderWallpaper';
import { TiledBackground } from '../../components/TiledBackground/TiledBackground';
import { ShowcaseWelcomeSection } from '../10-Welcome/ShowcaseWelcome';
import { FooterSection } from '../90-Footer/Footer';
import styles from './ShowcaseContent.module.css';

export function ShowcaseContent() {
    return (
        <div className={styles.page}>
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
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
