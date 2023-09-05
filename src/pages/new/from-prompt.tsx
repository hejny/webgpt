import Link from 'next/link';
import { useRouter } from 'next/router';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { Center } from '../../components/Center/Center';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;

export default function NewWallpaperFromPromptPage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <div style={{ textAlign: 'left' }}>
                            <h1>AI Web Maker</h1>
                            The feature is not implemented yet.
                            <br />
                            Please use some image generator
                            <br />
                            for example MidJourney, Dalle or Stable Diffusion
                            <br />
                            and then use
                            <Link href="/new/from-image"> new from image</Link> instead.
                        </div>
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
 * TODO: !!! Design + some common css for such pre-page pages
 * TODO: !!! Active links
 * TODO: !!! Underline links
 */
