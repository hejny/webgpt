import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import styles from '../styles/static.module.css';

export default function UploadPage() {
    const router = useRouter();
    const homeUrl = typeof router.query.home === 'string' ? router.query.home : null;

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <h1>AI Web Maker</h1>
                    <p>Upload image and make web:</p>
                </main>

                {/* TODO: Make here some footer
                <footer>
                    <FooterSection />
                </footer>
                */}
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
 * TODO: !!! Implement
 * TODO: !!! Page structure - back to random wallpaper, samples, gallery,...
 * TODO: !!! Better url than /custom
 */
