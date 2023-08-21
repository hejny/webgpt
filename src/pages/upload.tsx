import { useRouter } from 'next/router';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { UploadWallpaper } from '../components/UploadWallpaper/UploadWallpaper';
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
                    <UploadWallpaper />
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

/**
 * TODO: !!! Implement
 * TODO: !!! Layout as empty page
 * TODO: !!! Page structure - back to random wallpaper, samples, gallery,...
 * TODO: !!! Better url than /custom
 * TODO: Camera
 * TODO: !!! Create some meaningfull content
 */
