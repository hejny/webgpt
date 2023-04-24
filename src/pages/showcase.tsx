import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Vector } from 'xyzt';
import { generated_wallpapers } from '../../assets/ai/wallpaper';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { AppHead } from '../sections/00-AppHead/AppHead';
import { CaveSection } from '../sections/01-Cave/Cave';
import { WelcomeSection } from '../sections/10-Welcome/Welcome';
import { ReferencesSection } from '../sections/40-References/References';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/common.module.css';

export default function ShowcasePage() {
    const Wallpaper = generated_wallpapers[16];

    return (
        <>
            <AppHead subtitle="Showcase" /* <- TODO: !! Translate */ />

            <div className={styles.page}>
                <DebugGrid size={new Vector(5, 5)} />
                <header>
                    {/* TODO: Do some system for multiple pages */}
                    <CaveSection />
                </header>
                <div className={styles.background}>
                    <Wallpaper />
                </div>
                <main>
                    Showcase
                    <WelcomeSection variant="SIDEPAGE" />
                    <ReferencesSection variant="FULL" />
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
