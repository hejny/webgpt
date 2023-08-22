import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { BackgroundPattern } from '../components/BackgroundPattern/BackgroundPattern';
import { FooterSection } from '../components/Footer/Footer';
import { Section } from '../components/Section/Section';
import styles from '../styles/static.module.css';

export default function NotFoundPage() {
    return (
        <>
            <StaticAppHead subtitle="Not found" /* <- TODO: !! Translate */ />

            <div className={styles.page}>
                <header>
                    {/* TODO: Do some system for multiple pages */}
                    {/* <CaveSection /> */}
                </header>
                <div className={styles.background}>
                    <BackgroundPattern />
                </div>
                <main>
                    {/* <WelcomeSection variant="SIDEPAGE" /> */}
                    <Section>
                        {/* TODO: [🙈] Unite 404 content */}
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
 * TODO: Redirect / link to index - DRY with not found wallpaper
 */
