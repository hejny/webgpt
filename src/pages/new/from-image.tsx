import Image from 'next/image';
import Link from 'next/link';
import webgptLogo from '../../../public/logo/webgpt.white.svg';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { Center } from '../../components/SimpleLayout/Center';
import { UploadNewWallpaper } from '../../components/UploadNewWallpaper/UploadNewWallpaper';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;

export default function NewWallpaperFromImagePage() {
    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1
                            style={{
                                transform: 'translate(0,-20px)',
                            }}
                        >
                            <Image alt="WebGPT logo" src={webgptLogo} />
                        </h1>

                        <UploadNewWallpaper />
                        <Link href="/">I have no image</Link>
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
 * TODO: [🏍] Standardize process of getting input data for new wallpaper
 */
