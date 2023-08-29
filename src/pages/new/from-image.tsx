import { useRouter } from 'next/router';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { Center } from '../../components/Center/Center';
import { UploadNewWallpaper } from '../../components/UploadNewWallpaper/UploadNewWallpaper';
import styles from '../../styles/static.module.css';

export default function NewWallpaperFromImagePage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1>AI Web Maker</h1>
                        <UploadNewWallpaper />
                    </Center>
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
 * TODO: Allow to use Camera (maybe in new route /new/from-camera)
 */
