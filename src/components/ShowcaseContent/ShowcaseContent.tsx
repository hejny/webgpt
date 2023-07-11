// import { Aigen } from '../../components/Aigen/Aigen';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/router';
import { AigenSimple } from '../../components/Aigen/AigenSimple';
import { HeaderWallpaper } from '../../components/HeaderWallpaper/HeaderWallpaper';
import { TiledBackground } from '../../components/TiledBackground/TiledBackground';
import { classNames } from '../../utils/classNames';
import { useLastSavedWallpaper } from '../../utils/hooks/useLastSavedWallpaper';
import { useMode } from '../../utils/hooks/useMode';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { ColorInput } from '../ColorInput/ColorInput';
import { ColorPreview } from '../ColorPreview/ColorPreview';
import { FooterSection } from '../Footer/Footer';
import { Menu } from '../Menu/Menu';
import { ShowcaseArticleSection } from '../ShowcaseArticle/ShowcaseArticle';
import styles from './ShowcaseContent.module.css';

export function ShowcaseContent() {
    const router = useRouter();
    const isPreview = router.query.mode === 'preview'; /* <- TODO: !!! Use useMode */
    const [wallpaper, modifyWallpaper] = useWallpaper();
    const lastSavedWallpaper = useLastSavedWallpaper();
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
                <TiledBackground />
            </div>
            <main>
                <ShowcaseArticleSection />
                {/*<ReferencesSection variant="SHORT" />*/}
            </main>
            <footer>
                <FooterSection />
            </footer>

            {isEditable &&
                wallpaper.colorStats.palette.map((color, i) => (
                    // TODO: !!!! Each picker should be placed on top of the color it represents
                    // TODO: !!!! [🧠] Semantic color palette - plan where each color should be used (and do not duplicate bg and ui items)
                    <div key={i} className={classNames(styles.colorEditing, styles[`palette${i}`])}>
                        {i === 0 && (
                            <Link
                                href={{
                                    pathname: '/[wallpaper]',
                                    query: {
                                        wallpaper: router.query.wallpaper,
                                        modal: 'colors',
                                    },
                                }}
                                className={classNames(styles.colorPickerWrapper)}
                                prefetch={false /* <- Note: Because this is a bit rare options */}
                            >
                                <ColorPreview color={'HUE_CIRCLE'} />
                            </Link>
                        )}

                        {wallpaper.colorStats.palette.map((color, j) => (
                            <div key={j} className={classNames(styles.colorPickerWrapper)}>
                                <ColorInput
                                    defaultValue={color.value}
                                    onChange={(newColor) => {
                                        modifyWallpaper((modifiedWallpaper) => {
                                            modifiedWallpaper.colorStats.palette[j].value = newColor;
                                            modifiedWallpaper.saveStage = 'EDITED';
                                            return modifiedWallpaper;
                                        });
                                    }}
                                    presetColors={
                                        // TODO: Optimize, do just once not for every color:
                                        lastSavedWallpaper.colorStats.palette.map((color) => ({
                                            title: color.note,
                                            color: color.value.toHex(),
                                        }))
                                    }
                                />
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
}

/**
 * TODO: Rename ACRY ShowcaseContent to ShowcaseLayout
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
