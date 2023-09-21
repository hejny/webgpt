import Link from 'next/link';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { HandwrittenText } from '../../components/HandwrittenText/HandwrittenText';
import { Center } from '../../components/SimpleLayout/Center';
import { UploadNewWallpaper } from '../../components/UploadNewWallpaper/UploadNewWallpaper';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import { Color } from '../../utils/color/Color';

export default function NewWallpaperFromImagePage() {
    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1
                            style={{
                                maxWidth: '400px',
                                // outline: '1px solid red',
                                // transform: 'translate(0,20px)',
                            }}
                        >
                            <HandwrittenText color={Color.from('#fff')} style={'BigPartiallyPartiallyJoined'}>
                                AI Web Maker
                            </HandwrittenText>
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
 * TODO: [👐] Unite design of all /new/* pages
 * TODO: [🌾] Unite design of all /new/* pages
 * TODO: [🥩] Make /new/just-from-image
 * TODO: [🏍] Standardize process of getting input data for new wallpaper
 */
