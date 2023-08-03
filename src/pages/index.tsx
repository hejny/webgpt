import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { FooterSection } from '../components/Footer/Footer';
import { NoSsr } from '../components/NoSsr/NoSsr';
import { Section } from '../components/Section/Section';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { WelcomeWallpaperShuffle } from '../components/WelcomeWallpaperShuffle/WelcomeWallpaperShuffle';
import styles from '../styles/static.module.css';

interface HomePageProps {}

export default function HomePage(props: HomePageProps) {
    return (
        <>
            <StaticAppHead subtitle="1-2i" />

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
                        <h2>1-2i</h2>
                        <NoSsr>
                            <WelcomeWallpaperShuffle />
                            <WelcomeWallpaperShuffle />
                            <WelcomeWallpaperShuffle />
                        </NoSsr>
                    </Section>
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
 * TODO: Go to last wallpaper
 * TODO: Make shuffle between wallpapers
 */
