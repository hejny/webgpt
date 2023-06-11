import { GalleryPageProps } from '.';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { FooterSection } from '../components/Footer/Footer';
import { Section } from '../components/Section/Section';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import styles from '../styles/static.module.css';

export default function NotFoundPage({ wallpapers }: GalleryPageProps) {
    return (
        <>
            <StaticAppHead subtitle="Not found" /* <- TODO: !! Translate */ />

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
                    <Section>
                        <h2>Nothing found here</h2>
                        {/* TODO: Some better texting <p>Sorry for that</p> */}
                    </Section>
                </main>
                <footer>
                    <FooterSection />
                </footer>
            </div>
        </>
    );
}


/**
 * TODO: !!! Make + export
 */