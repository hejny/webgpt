import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getWallpapers } from '../../scripts/utils/wallpaper/getWallpapers';
import { PricingTableNext } from '../components/PricingTable/PricingTableNext';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { StaticAppHead } from '../sections/00-AppHead/StaticAppHead';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/static.module.css';

export default function PricingPage() {
    return (
        <>
            <StaticAppHead subtitle="Pricing" /* <- TODO: !! Translate */ />

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
        </>
    );
}

/**
 * TODO: Make or remove this page
 */
