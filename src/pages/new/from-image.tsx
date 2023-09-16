import Link from 'next/link';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { Center } from '../../components/Center/Center';
import { UploadNewWallpaper } from '../../components/UploadNewWallpaper/UploadNewWallpaper';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;

export default function NewWallpaperFromImagePage() {
    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1>AI Web Maker</h1>
                        <UploadNewWallpaper />
                        <Link href="/">I have not an image</Link>
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
 * TODO: Split between /new/from-image and /new/just-from-image
 * TODO: Allow to use Camera (maybe in new route /new/from-camera)
 * TODO: [🌾] Unite design of all /new/* pages
 * TODO: [🥩] Make /new/just-from-image
 */
