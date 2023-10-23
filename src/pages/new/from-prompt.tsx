import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import webgptLogo from '../../../public/logo/webgpt.white.svg';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { LanguagePickerWithHint } from '../../components/LanguagePicker/LanguagePickerWithHint';
import { Center } from '../../components/SimpleLayout/Center';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;

export default function NewWallpaperFromPromptPage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />
            <LanguagePickerWithHint />

            <div className={styles.page}>
                <main>
                    <Center>
                        <div style={{ textAlign: 'left' }}>
                            <h1
                                style={{
                                    transform: 'translate(0,-20px)',
                                }}
                            >
                                <Image alt="WebGPT logo" src={webgptLogo} />
                            </h1>
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
 * TODO: [🏍] Standardize process of getting input data for new wallpaper
 */
