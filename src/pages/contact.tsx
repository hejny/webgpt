import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { StaticAppHead } from '../sections/00-AppHead/StaticAppHead';
import { ContactSection } from '../sections/70-Contact/Contact';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/static.module.css';

export default function ContactPage() {
    return (
        <>
            <StaticAppHead subtitle="Contact" /* <- TODO: !! Translate */ />

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
                    <ContactSection variant="FULL" />
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
