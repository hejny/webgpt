// import { Aigen } from '../../components/Aigen/Aigen';
import { useRouter } from 'next/router';
import { AigenSimple } from '../../components/Aigen/AigenSimple';
import { HeaderWallpaper } from '../../components/HeaderWallpaper/HeaderWallpaper';
import { useCurrentWallpaperFonts } from '../../utils/hooks/useCurrentWallpaperFonts';
import { BackgroundPattern } from '../BackgroundPattern/BackgroundPattern';
import { FooterSection } from '../Footer/Footer';
import type { ImportFonts } from '../ImportFonts/ImportFonts';
import { Menu } from '../Menu/Menu';
import { WallpaperContentSection } from '../WallpaperContent/WallpaperContent';
import styles from './WallpaperLayout.module.css';

/**
 * Renders the wallpaper layout (header, footer, background, content)
 */
export function WallpaperLayout() {
    const router = useRouter();
    const isPreview = router.query.mode === 'show-thumbnail'; /* <- TODO: !! Use useMode */
    const { mainWallpaperFont, allWallpaperFonts } = useCurrentWallpaperFonts();

    return (
        <div
            className={styles.page}
            style={{
                fontFamily: mainWallpaperFont,
                // <- TODO: fontFamilyToFontCss
                // <- Note: [♑] The font is removed as inlined and put in the css file in the export
            }}
        >
            <ImportFonts fonts={allWallpaperFonts} />

            {!isPreview && <AigenSimple />}
            {/* isPreview && <Aigen /> */}

            {!isPreview && <Menu />}

            <header>
                <HeaderWallpaper />
            </header>

            <div className={styles.background}>
                <BackgroundPattern />
            </div>
            <main>
                <WallpaperContentSection />
                {/*<ReferencesSection variant="SHORT" />*/}
            </main>
            <footer>
                <FooterSection />
            </footer>
        </div>
    );
}

/**
 * TODO: Rename ACRY WallpaperLayout to WallpaperLayout
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
