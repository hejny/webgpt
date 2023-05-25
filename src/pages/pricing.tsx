import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Vector } from 'xyzt';
import { PageProps } from '.';
import { getWallpapers } from '../../scripts/utils/wallpaper/getWallpapers';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { PricingTableNext } from '../components/PricingTable/PricingTableNext';
import { PricingTableTailwind } from '../components/PricingTable/PricingTableTailwind';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { StaticAppHead } from '../sections/00-AppHead/StaticAppHead';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/static.module.css';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { hydrateWallpapers } from '../utils/hydrateWallpapers';

export default function PricingPage({ wallpapers }: PageProps) {
    return (
        <WallpapersContext.Provider
            value={hydrateWallpapers(wallpapers)} /* <- Is this the right place to be Provider in? */
        >
            <StaticAppHead subtitle="Pricing" /* <- TODO: !! Translate */ />

            <div className={styles.page}>
                <DebugGrid size={new Vector(5, 5)} />
                <header>
                    {/* TODO: Do some system for multiple pages */}
                    {/* <CaveSection /> */}
                </header>
                <div className={styles.background}>
                    {/* TODO: Do some system for multiple pages */}
                    <TiledBackground />
                </div>
                <main>
                    <h1>Pricing table by Tailwind</h1>
                    <PricingTableTailwind />
                    <h1>Pricing table by ChatGPT in next</h1>
                    <PricingTableNext
                        plans={[
                            {
                                id: 1,
                                name: 'Basic',
                                price: 9.99,
                                benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
                            },
                            {
                                id: 2,
                                name: 'Pro',
                                price: 19.99,
                                benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
                            },
                            {
                                id: 3,
                                name: 'Premium',
                                price: 29.99,
                                benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4', 'Benefit 5'],
                            },
                        ]}
                    />
                </main>
                <footer>
                    <FooterSection />
                </footer>
            </div>
        </WallpapersContext.Provider>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            wallpapers: await getWallpapers(),
        },
    };
}

/**
 * TODO: Make some menu
 * TODO: [🧈] Best way how to share page css
 *        <a href=" https://www.midjourney.com/app/jobs/fe3480c5-76af-45da-ac4e-5177062bcb6b">*MidJourney</a>
 * TODO: DRY with index.tsx
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 */
