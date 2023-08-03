import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo } from 'react';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { RandomWallpaperManager } from '../components/ControlPanel/RandomWallpaper/RandomWallpaperManager';
import { DeviceIframe } from '../components/DeviceIframe/DeviceIframe';
import { FooterSection } from '../components/Footer/Footer';
import { Section } from '../components/Section/Section';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import styles from '../styles/static.module.css';
import { usePromise } from '../utils/hooks/usePromise';
import { string_wallpaper_id } from '../utils/typeAliases';

interface HomePageProps {
    randomWallpaperId: string_wallpaper_id;
}

export default function HomePage(props: HomePageProps) {
    const randomWallpaperPromise = useMemo(() => {
        const randomWallpaperManager = new RandomWallpaperManager();
        return /* not await */ randomWallpaperManager.getRandomWallpaper();
    }, []);
    const { value: randomWallpaper } = usePromise(randomWallpaperPromise);

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
                        {randomWallpaper && <DeviceIframe src={`/${randomWallpaper.id}`} isInteractive={false} />}
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
