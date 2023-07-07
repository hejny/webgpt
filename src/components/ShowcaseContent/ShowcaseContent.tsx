// import { Aigen } from '../../components/Aigen/Aigen';
import { useRouter } from 'next/router';
import { AigenSimple } from '../../components/Aigen/AigenSimple';
import { HeaderWallpaper } from '../../components/HeaderWallpaper/HeaderWallpaper';
import { TiledBackground } from '../../components/TiledBackground/TiledBackground';
import { useMode } from '../../utils/hooks/useMode';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { ColorInput } from '../ColorInput/ColorInput';
import { FooterSection } from '../Footer/Footer';
import { Menu } from '../Menu/Menu';
import { ShowcaseArticleSection } from '../ShowcaseArticle/ShowcaseArticle';
import styles from './ShowcaseContent.module.css';

export function ShowcaseContent() {
    const router = useRouter();
    const isPreview = router.query.mode === 'preview'; /* <- TODO: !!! Use useMode */
    const [wallpaper, modifyWallpaper] = useWallpaper();
    const { isEditable } = useMode();

    return (
        <div className={styles.page}>
            {!isPreview && <AigenSimple />}
            {/* isPreview && <Aigen /> */}

            {!isPreview && <Menu />}

            <header>
                <HeaderWallpaper />
            </header>
            <div className={styles.background}>
                {/* !!!!!!! Color edit */}
                <TiledBackground />
            </div>
            <main>
                {isEditable && (
                    // !!!! Multiple pickers
                    <div className={styles.floatingColorPicker}>
                        <ColorInput
                            defaultValue={wallpaper.colorStats.palette[0].value}
                            onChange={(newColor) => {
                                modifyWallpaper((modifiedWallpaper) => {
                                    wallpaper.colorStats.palette[0].value = newColor;
                                    modifiedWallpaper.saveStage = 'EDITED';
                                    return modifiedWallpaper;
                                });
                            }}
                        />
                    </div>
                )}
                <ShowcaseArticleSection />
                {/*<ReferencesSection variant="SHORT" />*/}
            </main>
            <footer>
                <FooterSection />
            </footer>
        </div>
    );
}

/**
 * TODO: !!!! Add here a color picker for the palette @see https://www.npmjs.com/package/react-color
 * TODO: Rename ACRY ShowcaseContent to ShowcaseLayout
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
