import { useRouter } from 'next/router';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { UploadNewWallpaper } from '../components/UploadNewWallpaper/UploadNewWallpaper';
import styles from '../styles/static.module.css';

export default function NewWallpaperPage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <h1>AI Web Maker</h1>
                    <UploadNewWallpaper />
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
