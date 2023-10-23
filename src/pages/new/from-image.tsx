import Image from 'next/image';
import Link from 'next/link';
import webgptLogo from '../../../public/logo/webgpt.white.svg';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { Hint } from '../../components/Hint/Hint';
import { LanguagePicker } from '../../components/LanguagePicker/LanguagePicker';
import { Center } from '../../components/SimpleLayout/Center';
import { Translate } from '../../components/Translate/Translate';
import { UploadNewWallpaper } from '../../components/UploadNewWallpaper/UploadNewWallpaper';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;

export default function NewWallpaperFromImagePage() {
    return (
        <>
            <StaticAppHead subtitle={null} />

            <Hint
                className={styles.Button}
                id="language-for-new-wallpaper"
                title="Switch language of your desired website"
                reapearCount={3}
                isDisabled // <- TODO: !! Enable - Fix layout of <Hint/>
            >
                <LanguagePicker />
            </Hint>

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
                        <Link href="/">
                            <>
                                {/* [⛳] */}
                                <Translate locale="en">I have no image</Translate>
                                <Translate locale="cs">Nemám obrázek</Translate>
                            </>
                        </Link>
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
 * TODO: Add <LanguagePicker /> to all new pages
 * TODO: Split between /new/from-image and /new/just-from-image
 * TODO: Allow to use Camera (maybe in new route /new/from-camera)
 * TODO: [🌾] Unite design of all /new/* pages
 * TODO: [🥩] Make /new/just-from-image
 * TODO: [🏍] Standardize process of getting input data for new wallpaper
 */
