// import { Aigen } from '../../components/Aigen/Aigen';
import { useRouter } from 'next/router';
import { AigenSimple } from '../../components/Aigen/AigenSimple';
import { HeaderWallpaper } from '../../components/HeaderWallpaper/HeaderWallpaper';
import { TiledBackground } from '../../components/TiledBackground/TiledBackground';
import { Color } from '../../utils/color/Color';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useMode } from '../../utils/hooks/useMode';
import { useObservable } from '../../utils/hooks/useObservable';
import { useWallpaperSubject } from '../../utils/hooks/useWallpaperSubject';
import { FooterSection } from '../Footer/Footer';
import { Menu } from '../Menu/Menu';
import { ShowcaseArticleSection } from '../ShowcaseArticle/ShowcaseArticle';
import styles from './ShowcaseContent.module.css';

export function ShowcaseContent() {
    const router = useRouter();
    const isPreview = router.query.mode === 'preview'; /* <- TODO: !!! Use useMode */

    // TODO: [🩺] One hook for [wallpaper,mutateWallpaper]
    const wallpaperId = useCurrentWallpaperId();
    const wallpaperSubject = useWallpaperSubject(wallpaperId);
    const { value: wallpaper } = useObservable(wallpaperSubject);
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
                    <input
                        type="color"
                        onChange={(event) => {
                            wallpaper.colorStats.palette[0].value = Color.fromHex(event.target.value);
                            wallpaperSubject.next({
                                ...wallpaperSubject.value,
                                /*content: newContent,*/ saveStage: 'EDITED',
                            });
                        }}
                    />
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
