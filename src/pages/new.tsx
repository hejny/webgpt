import { useRouter } from 'next/router';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { UploadNewWallpaper } from '../components/UploadNewWallpaper/UploadNewWallpaper';
import styles from '../styles/static.module.css';
import { isRunningInBrowser, isRunningInNode, isRunningInWebWorker } from '../utils/isRunningInWhatever';

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

export async function getStaticProps() {
    console.log('[🧪] getStaticProps', {
        isRunningInBrowser: isRunningInBrowser(),
        isRunningInNode: isRunningInNode(),
        isRunningInWebWorker: isRunningInWebWorker(),
    });

    return { props: {} };
}

/**
 * TODO: !! Page structure - back to random wallpaper, samples, gallery,...
 * TODO: Camera
 * TODO: !! Create some meaningfull content by AI recognition
 */
