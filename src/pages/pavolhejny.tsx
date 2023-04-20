import { Oswald } from '@next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Vector } from 'xyzt';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { AppHead } from '../sections/00-AppHead/AppHead';
import { CaveSection } from '../sections/01-Cave/Cave';
import { WelcomeSection } from '../sections/10-Welcome/Welcome';
import { PavolHejnySection } from '../sections/20-PavolHejny/PavolHejny';
import { MyProjectsSection } from '../sections/50-MyProjects/MyProjects';
import { ContactSection } from '../sections/70-Contact/Contact';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/common.module.css';
import { classNames } from '../utils/classNames';

const oswaltFont = Oswald({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

export default function PavolHejnyPage() {
    return (
        <>
            <AppHead /* <- TODO: !! Use subtitle and translate it */ />

            <div className={classNames(styles.page, oswaltFont.className)}>
                <DebugGrid size={new Vector(3, 5)} />

                <header>
                    <CaveSection />
                </header>

                <div className={styles.background}>
                    <TiledBackground />
                </div>

                <main>
                    <WelcomeSection variant="PAVOLHEJNY" />
                    <PavolHejnySection variant="FULL" />
                    <MyProjectsSection />

                    {/* TODO: Services OR/AND References - some link to 0-1 */}
                    <ContactSection variant="SHORT" />
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
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: [🪒] Can be fonts shared between all pages?
 * TODO: !!! Replace this also as personal page
 * TODO: [🧈] Best way how to share page css
 * TODO: Custom 404 page
 * TODO: The best way to import the fonts
 * TODO: Add Google Analytics
 * TODO: Add cookies icon
 * TODO: Add AMP capability
 * TODO: Add Preview image for Facebook, Facebook App/Page, Twitter, Instagram, OG images, description and keywords
 */
