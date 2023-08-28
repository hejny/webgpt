import { useRouter } from 'next/router';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import styles from '../../styles/static.module.css';

export default function NewWallpaperFromPromptPage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <h1>AI Web Maker</h1>
                    TODO: !!! Working on this feature
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
 * TODO: !!! Make (probbably in /other) some library of custom wallpaper samples
 * TODO: !! Page structure - back to random wallpaper, samples, gallery,...
 */
